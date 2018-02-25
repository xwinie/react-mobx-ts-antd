"use strict";

import React, { Component } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Modal, Col, Form, Input, Row, Table } from "antd";
import { IResource } from "../../model/role";
import { ColumnProps } from "antd/lib/table";
import * as moment from "moment";
const Search = Input.Search;
class MyTable extends Table<IResource> {
}

interface FormProps {
    onCancel: any
    onOk: any
    visible: boolean
    confirmLoading: boolean
    selectedData: Array<string>
    resourceData: Array<IResource>
    onSelectChange: any
    onSelectSearch: any

}

let selectedArray: Array<string>;
@observer
class SelectResourceModal extends Component<FormProps, any> {
    state = {
        columns: [
            { title: 'Id', dataIndex: 'Id', key: '1' },
            { title: '资源编码', dataIndex: 'Code', key: '2' },
            { title: '资源名称', dataIndex: 'Name', key: '3' },
            {
                title: '资源类型', dataIndex: 'ResType', key: '4', render: text => {
                    if (text == 0) {
                        return <span>接口</span>;
                    } else if (text == 1) {
                        return <span>菜单</span>;
                    }
                    else {
                        return <span>未知</span>;
                    }
                }, filters: [
                    { text: '接口', value: '0' },
                    { text: '菜单', value: '1' },
                ],
                onFilter: (value, record) => record.ResType == value,
            },
            {
                title: '是否开放', dataIndex: 'IsOpen', key: 'IsOpen', render: text => {
                    if (text == 0) {
                        return <span>需要权限</span>;
                    } else if (text == 1) {
                        return <span>不需要权限</span>;
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
            }] as ColumnProps<IResource>[]
    };

    FormDate(text: any) {
        return moment(text).local().format("YYYY-MM-DD HH:mm:ss")
    }

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {
        this.props.onOk(selectedArray)
    }


    onSelectChange = (selectedRowKeys: Array<string>) => {
        this.props.onSelectChange(selectedRowKeys);
        selectedArray = selectedRowKeys;
    };
    handleSearch(value: string) {
        this.props.onSelectSearch(value);

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
                </Row>
            </Form>
        )
    }

    render() {

        const { visible, confirmLoading, resourceData, selectedData } = this.props;
        const rowSelection = {
            selectedRowKeys: toJS(selectedData),
            onChange: this.onSelectChange,
        };
        return (
            <Modal
                visible={visible}
                title="选择权限"
                okText="确定"
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{ pointerEvents: confirmLoading ? 'none' : '' }}
                maskClosable={!confirmLoading}
            >
                {
                    this.renderTableActionSimple()
                }
                <MyTable rowKey={(record: IResource) => record.Id + '' as string} columns={this.state.columns}
                    rowSelection={rowSelection}
                    dataSource={toJS(resourceData)}
                    scroll={{ x: 1000 }}
                    size="default" />
            </Modal>
        )
    }
}

export default SelectResourceModal;
