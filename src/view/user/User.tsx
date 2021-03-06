import * as React from "react";
import { inject, observer } from "mobx-react";
import { Col, Form, Icon, Input, message, Popconfirm, Row, Table } from "antd";
import { ActionTag } from "ev-ui";
import * as moment from "moment";
import { toJS, transaction } from "mobx";
import Page from "../../components/page/Page";
import { ColumnProps } from "antd/lib/table";
import api from "../../model/api";
import { IAuth } from "../../model/auth";
import { IUser, IUserView } from "../../model/user";
import UpdateModal from "./UpdateModal";
import CreateModal from './CreateModal'
import SelectRoleModal from './SelectRoleModal'
import { IRole } from "../../model/role";
const Search = Input.Search;


interface UserProps {
    auth?: IAuth
    user?: IUserView
}


class UserTable extends Table<IUser> {
}

@inject('auth', 'user')
@observer
class User extends React.Component<UserProps, any> {

    state = {
        columns: [
            { title: 'Id', dataIndex: 'Id', key: '1' },
            { title: '账号', dataIndex: 'Account', key: '2', fixed: 'left', width: 150 },
            { title: '姓名', dataIndex: 'Name', key: '3', fixed: 'left', width: 170 },
            {
                title: '用户类型', dataIndex: 'UserType', key: '4',
                render: text => {
                    if (text == 0) {
                        return <span>第三方用户</span>;
                    } else if (text == 1) {
                        return <span>后端管理用户</span>;
                    }
                    else {
                        return <span>未知</span>;
                    }
                }
            },
            {
                title: '是否删除', dataIndex: 'DeleteStatus', key: '5',
                render: text => {
                    if (text == 0) {
                        return <span>正常</span>;
                    } else if (text == 1) {
                        return <span>已删除</span>;
                    }
                    else {
                        return <span>未知</span>;
                    }
                }
            },
            {
                title: '创建时间', dataIndex: 'Created', key: '7', render: text => {
                    return <span>{this.FormDate(text)}</span>;
                }
            },
            {
                title: '修改时间', dataIndex: 'Updated', key: '8',
                render: text => {
                    return <span>{this.FormDate(text)}</span>;
                }
            },
            {
                title: '是否锁住', dataIndex: 'Locked', key: '6',
                render: text => {
                    if (text == 0) {
                        return <span>正常</span>;
                    } else {
                        return <span>锁住</span>;
                    }
                }
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                dataIndex: '',
                width: 200,
                render: (text: string, record: IUser) => {
                    return [
                        <Row key="operationAction">
                            <Col span={7} style={{ textAlign: 'left' }}>
                                <Popconfirm
                                    title="确定删除?"
                                    placement="topRight"
                                    onConfirm={this.deleteItem.bind(this, record)}
                                    onCancel={v => v}
                                >
                                    <a href="javascript:;"><Icon type="delete" />删除</a>
                                </Popconfirm>
                            </Col>
                            <Col span={7} style={{ textAlign: 'center' }}>
                                <a onClick={this.showUpdateModal.bind(this, record)}> <Icon type="edit" />修改</a>
                            </Col>
                            <Col span={9} style={{ textAlign: 'right' }}>
                                <a onClick={this.showSelectModal.bind(this, record)}><Icon type="select" />角色</a>
                            </Col>
                        </Row>

                    ]
                }
            }] as ColumnProps<IUser>[]
    };

    // 初始化数据
    componentDidMount() {
        const user = this.props.user as IUserView;
        this.getTableData({
            perPage: user.pagination.pageSize,
            p: user.pagination.current,
        })
        this.getRoleData()
    }

    FormDate(text: any) {
        return moment(text).local().format("YYYY-MM-DD HH:mm:ss")
    }

    getTableData(params: any) {
        const iAuth = this.props.auth as IAuth;
        const user = this.props.user as IUserView;

        user.tableLoadingAction(true);
        api.getUsers(iAuth.ValidToken, params).then((res) => {
            const pagination = user.pagination;
            // 读取数据总条数
            pagination.total = res.data.Total;
            user.tableDataAction(res.data.Users as Array<IUser>, pagination, false);
        });

    }

    getRoleData() {
        const iAuth = this.props.auth as IAuth;
        const user = this.props.user as IUserView;
        api.getRoles(iAuth.ValidToken, { "perPage": 100000, "p": 1 }).then((res) => {
            user.roleDataAction(res.data.Roles);
        }).catch((error: any) => {
            message.error(error.toString());
        });

    }
    // 关键词搜索
    handleSearch(value: string) {
        const iAuth = this.props.auth as IAuth;
        const user = this.props.user as IUserView;
        const pager = user.pagination;
        if (value == "") {
            this.getTableData({
                perPage: pager.pageSize,
                p: 1,
            });
        }
        else {

            user.tableLoadingAction(true);

            api.getUserByAccount(iAuth.token, value).then((res) => {

                // 读取数据总条数
                pager.total = res.data.length;

                user.oneTableDataAction(res.data, pager, false);

            }).catch((error: any) => {
                // 读取数据总条数
                pager.total = 0;
                user.notFoundTableDataAction(pager, false);
            });
        }
    }

    //显示
    showUpdateModal = (data: IUser) => {
        const user = this.props.user as IUserView;
        user.loadingAction(true);
        transaction(() => {
            user.loadingAction(false);
            user.updateModalVisibleAction(true);
            user.initialUpdateValueAction(data);
        });
    };

    //更新相关 UpdateModal
    handleUpdateModalCancel() {
        const user = this.props.user as IUserView;
        user.updateModalVisibleAction(false);
    }

    handleUpdateModalOk(data: IUser) {
        const user = this.props.user as IUserView;
        const iAuth = this.props.auth as IAuth;
        user.updateModalConfirmLoadingAction(true);

        let d: IUser = {};
        d.Name = data.Name;
        d.UserType = data.UserType ? 0 : 1 as number;
        d.Locked = data.Locked ? 0 : 1 as number;

        api.updateUser(iAuth.ValidToken, data.Id as string, d).then((res) => {
            user.updateModalAction(false, false);
            message.success('修改成功');
            this.getTableData({
                perPage: user.pagination.pageSize,
                p: user.pagination.current,
            })
        }).catch((error: any) => {
            user.updateModalConfirmLoadingAction(false);
            message.error(error.toString());
        });
    }

    // open create modal
    showCreateModal = () => {
        const user = this.props.user as IUserView;
        user.createModalVisibleAction(true);

    };

    //新建相关 CreateModal
    handleCreateModalCancel() {
        const user = this.props.user as IUserView;
        user.createModalVisibleAction(false);
    }

    handleCreateModalOk(data: IUser) {
        const user = this.props.user as IUserView;
        const iAuth = this.props.auth as IAuth;
        user.createModalConfirmLoadingAction(true);

        let d: IUser = {};
        d.Account = data.Account;
        d.Name = data.Name;
        d.UserType = data.UserType ? 0 : 1 as number;
        d.Password = api.encryptionPassword(data.Account as string, data.Password as string);

        api.createUser(iAuth.ValidToken, d).then((res) => {
            user.createModalAction(false, false);
            message.success('创建成功');
            this.getTableData({
                perPage: user.pagination.pageSize,
                p: user.pagination.current,
            })
        }).catch((error: any) => {
            user.createModalConfirmLoadingAction(false);
            message.error(error.toString());
        });

        user.createModalAction(false, false);

    }


    //显示
    showSelectModal = (data: IUser) => {
        const user = this.props.user as IUserView;
        const iAuth = this.props.auth as IAuth;
        user.loadingAction(true);
        api.getRoleByUserId(iAuth.ValidToken, data.Id as string).then((res1) => {
            transaction(() => {
                let selectedKeyArray: Array<string> = [];
                if (res1.data.Roles) {
                    res1.data.Roles.map((value: IRole) => {
                        selectedKeyArray.push(value.Id + '');
                    });
                }
                user.selectedDataAction(selectedKeyArray);
                user.loadingAction(false);
                user.selectedModalVisibleAction(true);
                user.selectedModalConfirmLoadingAction(false);
                user.selectedUserIdAction(data.Id as string);
            }
            );
        }).catch((error: any) => {
            message.error(error.toString());
        });


    };
    //分配权限
    handleSelectModalCancel() {
        const user = this.props.user as IUserView;
        user.selectedModalVisibleAction(false);
    }

    handleSelectModalOk(data: Array<string>) {
        // console.log(111, data);
        const user = this.props.user as IUserView;
        user.selectedModalConfirmLoadingAction(true);
        const iAuth = this.props.auth as IAuth;
        api.userDistributorRole(iAuth.ValidToken, user.selectUserId as string, data).then((res) => {
            user.selectedModalAction(false, false);
            message.success('分配成功');
            this.getTableData({
                perPage: user.pagination.pageSize,
                p: user.pagination.current,
            })
        }).catch((error: any) => {
            user.selectedModalConfirmLoadingAction(false);
            message.error(error.toString());
        });

    }

    handleSelectChange(data: Array<string>) {
        const user = this.props.user as IUserView;
        user.selectedDataAction(data);
    }


    // 删除数据项
    deleteItem(record: IUser) {
        const user = this.props.user as IUserView;
        const iAuth = this.props.auth as IAuth;
        user.tableLoadingAction(true);

        api.deleteUser(iAuth.ValidToken, record.Id as string).then((res) => {
            message.success('删除成功');
            this.getTableData({
                perPage: user.pagination.pageSize,
                p: user.pagination.current,
            })
        }).catch((error: any) => {
            message.error(error.toString());
        });
        user.tableLoadingAction(false);
    }


    renderTableActionSimple() {
        return (
            <Form
                className="admin-table-action"
            >
                <Row>
                    <Col span={22} style={{ textAlign: 'left' }}>
                        <Search
                            placeholder="请输入搜索内容"
                            style={{ width: 200 }}
                            onSearch={this.handleSearch.bind(this)}
                        />
                    </Col>
                    <Col span={2} style={{ textAlign: 'left' }}>
                        <ActionTag iconField={<Icon type='plus-circle-o' />} textField='新增'
                            onClick={this.showCreateModal.bind(this)} />
                    </Col>
                </Row>
            </Form>
        )
    }

    render() {
        const user = this.props.user as IUserView;
        return (

            <Page title="用户管理" loading={user.isLoading}>
                {
                    this.renderTableActionSimple()
                }
                <UserTable rowKey={(record: IUser) => record.Account as string} columns={this.state.columns}
                    dataSource={toJS(user.tableData)}
                    scroll={{ x: 1400 }}
                    size="middle"
                    pagination={user.pagination} loading={user.isTableLoading} />
                <UpdateModal
                    initialValue={user.initialUpdateValue}
                    visible={user.updateModalVisible}
                    confirmLoading={user.updateModalConfirmLoading}
                    onCancel={this.handleUpdateModalCancel.bind(this)}
                    onOk={this.handleUpdateModalOk.bind(this)}
                />
                <CreateModal
                    visible={user.createModalVisible}
                    confirmLoading={user.createModalConfirmLoading}
                    onCancel={this.handleCreateModalCancel.bind(this)}
                    onOk={this.handleCreateModalOk.bind(this)}
                />
                <SelectRoleModal
                    roleData={user.roleData}
                    selectedData={user.selectedData}
                    visible={user.selectedModalVisible}
                    confirmLoading={user.selectedConfirmLoading}
                    onSelectChange={this.handleSelectChange.bind(this)}
                    onCancel={this.handleSelectModalCancel.bind(this)}
                    onOk={this.handleSelectModalOk.bind(this)}
                />

            </Page>
        )
    }
}

export default User;
