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
import { IResource, IRole, IRoleView } from "../../model/role";
import UpdateModal from "./UpdateModal";
import CreateModal from "./CreateModal";
import SelectResourceModal from "./SelectResourceModal";
const Search = Input.Search;


interface RoleProps {
    auth?: IAuth
    role?: IRoleView
}


class UserTable extends Table<IRole> {
}

@inject('auth', 'role')
@observer
class Role extends React.Component<RoleProps, any> {

    state = {
        columns: [
            { title: 'Id', dataIndex: 'Id', key: '1' },
            { title: '角色编码', dataIndex: 'Code', key: '2', fixed: 'left', width: 150 },
            { title: '角色名称', dataIndex: 'Name', key: '3', fixed: 'left', width: 170 },
            { title: '角色描述', dataIndex: 'Description', key: '4' },
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
                render: (text: string, record: IRole) => {
                    return [
                        <Row key="operationAction">
                            <Col span={7} style={{ textAlign: 'center' }}>
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
                                <a onClick={this.showSelectModal.bind(this, record)}><Icon type="select" />资源</a>
                            </Col>
                        </Row>

                    ]
                }
            }] as ColumnProps<IRole>[]
    };

    // 初始化数据
    componentDidMount() {
        const role = this.props.role as IRoleView;
        this.getTableData({
            perPage: role.pagination.pageSize,
            p: role.pagination.current,
        })
        this.getResourceData()
    }

    FormDate(text: any) {
        return moment(text).local().format("YYYY-MM-DD HH:mm:ss")
    }

    getTableData(params: any) {
        const iAuth = this.props.auth as IAuth;
        const role = this.props.role as IRoleView;
        role.tableLoadingAction(true);
        api.getRoles(iAuth.ValidToken, params).then((res) => {
            const pagination = role.pagination;
            // 读取数据总条数
            pagination.total = res.data.Total;
            role.tableDataAction(res.data.Roles as Array<IRole>, pagination, false);
        });

    }

    getResourceData() {
        const iAuth = this.props.auth as IAuth;
        const role = this.props.role as IRoleView;
        api.getResourceAll(iAuth.ValidToken).then((res) => {
            role.resourceDataAction(res.data.Resources);
        }).catch((error: any) => {
            message.error(error.toString());
        });

    }

    // 关键词搜索
    handleSearch(value: string) {
        const iAuth = this.props.auth as IAuth;
        const role = this.props.role as IRoleView;
        const pager = role.pagination;
        if (value == "") {
            this.getTableData({
                perPage: role.pagination.pageSize,
                p: 1,
            })
        } else {

            role.tableLoadingAction(true);

            api.getRoleByCode(iAuth.token, value).then((res) => {

                // 读取数据总条数
                pager.total = res.data.length;

                role.oneTableDataAction(res.data, pager, false);

            }).catch((error: any) => {
                // 读取数据总条数
                pager.total = 0;
                role.notFoundTableDataAction(pager, false);
            });
        }
    };

    //显示
    showUpdateModal = (data: IRole) => {
        const role = this.props.role as IRoleView;
        role.loadingAction(true);
        transaction(() => {
            role.loadingAction(false);
            role.updateModalVisibleAction(true);
            role.initialUpdateValueAction(data);
        });
    };

    //更新相关 UpdateModal
    handleUpdateModalCancel() {
        const role = this.props.role as IRoleView;
        role.updateModalVisibleAction(false);
    }

    handleUpdateModalOk(data: IRole) {
        const role = this.props.role as IRoleView;
        const iAuth = this.props.auth as IAuth;
        role.updateModalConfirmLoadingAction(true);

        let d: IRole = {};
        d.Name = data.Name;
        d.Description = data.Description;
        d.Locked = data.Locked ? 0 : 1 as number;

        api.updateRole(iAuth.ValidToken, data.Id+'', d).then((res) => {
            role.updateModalAction(false, false);
            message.success('修改成功');
            this.getTableData({
                perPage: role.pagination.pageSize,
                p: role.pagination.current,
            })
        }).catch((error: any) => {
            role.updateModalConfirmLoadingAction(false);
            message.error(error.toString());
        });
    }

    // open create modal
    showCreateModal = () => {
        const role = this.props.role as IRoleView;
        role.createModalVisibleAction(true);

    };

    //新建相关 CreateModal
    handleCreateModalCancel() {
        const role = this.props.role as IRoleView;
        role.createModalVisibleAction(false);
    }

    handleCreateModalOk(data: IRole) {
        const role = this.props.role as IRoleView;
        const iAuth = this.props.auth as IAuth;
        role.createModalConfirmLoadingAction(true);

        // console.log('create data:', data);
        let d: IRole = {};
        d.Code = data.Code;
        d.Description = data.Description;
        d.Name = data.Name;

        api.createRole(iAuth.ValidToken, d).then((res) => {
            role.updateModalAction(false, false);
            message.success('创建成功');
            this.getTableData({
                perPage: role.pagination.pageSize,
                p: role.pagination.current,
            })
        }).catch((error: any) => {
            role.updateModalConfirmLoadingAction(false);
            message.error(error.toString());
        });

        role.createModalAction(false, false);

    }

    //显示
    showSelectModal = (data: IRole) => {
        const role = this.props.role as IRoleView;
        const iAuth = this.props.auth as IAuth;
        role.loadingAction(true);

        api.getResourceByRoleId(iAuth.ValidToken, data.Id as string).then((res1) => {
            transaction(() => {
                let selectedKeyArray: Array<string> = [];
                if (res1.data.Resources) {
                    res1.data.Resources.map((value: IResource) => {
                        selectedKeyArray.push(value.Id as string);
                    });
                }
                role.selectedDataAction(selectedKeyArray);
                role.loadingAction(false);
                role.selectedModalVisibleAction(true);
                role.selectedModalConfirmLoadingAction(false);
                role.selectedRoleIdAction(data.Id as string);
            }
            );
        }).catch((error: any) => {
            message.error(error.toString());
        });


    };
    //分配权限
    handleSelectModalCancel() {
        const role = this.props.role as IRoleView;
        role.selectedModalVisibleAction(false);
    }

    handleSelectModalOk(data: Array<string>) {
        const role = this.props.role as IRoleView;
        role.selectedModalConfirmLoadingAction(true);
        const iAuth = this.props.auth as IAuth;
        api.roleDistributorResource(iAuth.ValidToken, role.selectRoleId as string, data).then((res) => {
            role.selectedModalAction(false, false);
            message.success('分配成功');
            this.getTableData({
                perPage: role.pagination.pageSize,
                p: role.pagination.current,
            })
        }).catch((error: any) => {
            role.selectedModalConfirmLoadingAction(false);
            message.error(error.toString());
        });

    }

    handleSelectChange(data: Array<string>) {
        const role = this.props.role as IRoleView;
        role.selectedDataAction(data);
    }

    // 删除数据项
    deleteItem(record: IRole) {
        const role = this.props.role as IRoleView;
        const iAuth = this.props.auth as IAuth;
        role.tableLoadingAction(true);

        api.deleteRole(iAuth.ValidToken, record.Id+'').then((res) => {
            message.success('删除成功');
            this.getTableData({
                perPage: role.pagination.pageSize,
                p: role.pagination.current,
            })
        }).catch((error: any) => {
            message.error(error.toString());
        });
        role.tableLoadingAction(false);
    }

    // 选择关键词搜索
    handleSelectSearch(value: string) {
        const iAuth = this.props.auth as IAuth;
        const role = this.props.role as IRoleView;
        if (value != "") {
            api.getResourceByCode(iAuth.token, value).then((res) => {
                role.oneResourceDataAction(res.data, false);

            }).catch((error: any) => {
                role.notFoundResourceDataAction(false)

            });
        }
    };


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
        const role = this.props.role as IRoleView;
        return (

            <Page title="角色管理" loading={role.isLoading}>
                {
                    this.renderTableActionSimple()
                }
                <UserTable rowKey={(record: IRole) => record.Code as string} columns={this.state.columns}
                    dataSource={toJS(role.tableData)}
                    scroll={{ x: 1400 }}
                    size="middle"
                    pagination={role.pagination} loading={role.isTableLoading} />
                <UpdateModal
                    initialValue={role.initialUpdateValue}
                    visible={role.updateModalVisible}
                    confirmLoading={role.updateModalConfirmLoading}
                    onCancel={this.handleUpdateModalCancel.bind(this)}
                    onOk={this.handleUpdateModalOk.bind(this)}
                />
                <CreateModal
                    visible={role.createModalVisible}
                    confirmLoading={role.createModalConfirmLoading}
                    onCancel={this.handleCreateModalCancel.bind(this)}
                    onOk={this.handleCreateModalOk.bind(this)}
                />
                <SelectResourceModal
                    resourceData={role.resourceData}
                    selectedData={role.selectedData}
                    visible={role.selectedModalVisible}
                    confirmLoading={role.selectedConfirmLoading}
                    onSelectChange={this.handleSelectChange.bind(this)}
                    onSelectSearch={this.handleSelectSearch.bind(this)}
                    onCancel={this.handleSelectModalCancel.bind(this)}
                    onOk={this.handleSelectModalOk.bind(this)}
                />

            </Page>
        )
    }
}

export default Role;
