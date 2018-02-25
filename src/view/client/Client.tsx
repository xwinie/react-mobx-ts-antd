import * as React from "react";
import { inject, observer } from "mobx-react";
import { toJS, transaction } from "mobx";
import { ColumnProps } from "antd/lib/table";
import { ActionTag } from "ev-ui";
import { Col, Form, Icon, Input, Row, Table, message, Popconfirm } from "antd";
import { IClient, IClientView } from '../../model/client';
import { IAuth } from "../../model/auth";
import Page from "../../components/page/Page";
import api from "../../model/api";
import CreateModal from './CreateModal'
const Search = Input.Search;

interface ClientProps {
    auth?: IAuth
    client?: IClientView
}


class MyTable extends Table<IClient> {
}

@inject('auth', 'client')
@observer
class Client extends React.Component<ClientProps, any> {
    state = {
        columns: [
            { title: 'Id', dataIndex: 'Id', key: '1' },
            { title: '应用ID', dataIndex: 'ClientId', key: '2' },
            { title: '应用名字', dataIndex: 'Name', key: '3', },
            { title: '签名key', dataIndex: 'Secret', key: '4' },
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
                render: (text: string, record: IClient) => {
                    return [
                        <Row key="operationAction">

                            <Col span={7} style={{ textAlign: 'center' }}>
                                <Popconfirm
                                    title="确定锁住?锁住后将无法使用！"
                                    placement="topRight"
                                    onConfirm={this.deleteItem.bind(this, record)}
                                    onCancel={v => v}
                                >
                                    <a href="javascript:;"><Icon type="lock" />锁</a>
                                </Popconfirm>
                            </Col>
                        </Row>

                    ]
                }
            }] as ColumnProps<IClient>[]
    };
    // 初始化数据
    componentDidMount() {
        this.getTableData({
            perPage: 100000,
            p: 1,
        })
    }

    getTableData(params: any) {
        const iAuth = this.props.auth as IAuth;
        const client = this.props.client as IClientView;

        client.tableLoadingAction(true);
        api.getClients(iAuth.ValidToken, params).then((res) => {
            transaction(() => {
                client.tableDataAction(res.data.Clients as Array<IClient>);
                client.tableLoadingAction(false);
            });

        }).catch((error: any) => {
            client.tableLoadingAction(false);
            message.error(error.toString());
        });;

    }
    // 关键词搜索
    handleSearch(value: string) {
        const iAuth = this.props.auth as IAuth;
        const client = this.props.client as IClientView;
        if (value == "") {
            this.getTableData({
                perPage: 100000,
                p: 1,
            });
        }
        else {
            client.tableLoadingAction(true);
            api.getClientByClientID(iAuth.token, value).then((res) => {
                client.oneTableDataAction(res.data, false);
            }).catch((error: any) => {
                // 读取数据总条数
                client.notFoundTableDataAction(false);
            });
        }
    }

    // open create modal
    showCreateModal = () => {
        const client = this.props.client as IClientView;
        client.createModalVisibleAction(true);
    };
    //新建相关 CreateModal
    handleCreateModalCancel() {
        const client = this.props.client as IClientView;
        client.createModalVisibleAction(false);
    }

    handleCreateModalOk(data: IClient) {
        const client = this.props.client as IClientView;
        const iAuth = this.props.auth as IAuth;
        client.createModalConfirmLoadingAction(true);
        api.createClient(iAuth.ValidToken, data).then((res) => {
            client.createModalAction(false, false);
            message.success('创建成功');
            this.getTableData({
                perPage: 100000,
                p: 1,
            });
        }).catch((error: any) => {
            client.createModalConfirmLoadingAction(false);
            message.error(error.toString());
        });

        client.createModalAction(false, false);

    }

    // 删除数据项
    deleteItem(record: IClient) {
        const client = this.props.client as IClientView;
        const iAuth = this.props.auth as IAuth;
        client.tableLoadingAction(true);
        api.lockClient(iAuth.ValidToken, record.Id as string, 1).then((res) => {
            message.success('锁成功');
            this.getTableData({
                perPage: 100000,
                p: 1,
            });
        }).catch((error: any) => {
            message.error(error.toString());
        });
        client.tableLoadingAction(false);
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
        const client = this.props.client as IClientView;
        return (

            <Page title="客户端管理" loading={client.isLoading}>
                {
                    this.renderTableActionSimple()
                }
                <MyTable rowKey={(record: IClient) => record.ClientId as string} columns={this.state.columns}
                    dataSource={toJS(client.tableData)}
                    scroll={{ x: 1400 }}
                    size="middle"
                    loading={client.isTableLoading} />
                <CreateModal
                    visible={client.createModalVisible}
                    confirmLoading={client.createModalConfirmLoading}
                    onCancel={this.handleCreateModalCancel.bind(this)}
                    onOk={this.handleCreateModalOk.bind(this)}
                />
            </Page>
        )
    }
}

export default Client;