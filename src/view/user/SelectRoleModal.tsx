"use strict";

import React, { Component } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Modal, Table } from "antd";
import { IRole } from "../../model/role";
import { ColumnProps } from "antd/lib/table";
import * as moment from "moment";

class MyTable extends Table<IRole> {
}

interface FormProps {
    onCancel: any
    onOk: any
    visible: boolean
    confirmLoading: boolean
    selectedData: Array<string>
    roleData: Array<IRole>
    onSelectChange: any

}

let selectedArray: Array<string>;
@observer
class SelectRoleModal extends Component<FormProps, any> {
    state = {
        columns: [{ title: 'Id', dataIndex: 'Id', key: '1' },
        { title: '角色编码', dataIndex: 'Code', key: '2'},
        { title: '角色名称', dataIndex: 'Name', key: '3'},
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
        }
        ] as ColumnProps<IRole>[]
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

    render() {

        const { visible, confirmLoading, roleData, selectedData } = this.props;
        const rowSelection = {
            selectedRowKeys: toJS(selectedData),
            onChange: this.onSelectChange,
        };
        return (
            <Modal
                visible={visible}
                title="选择角色"
                okText="确定"
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{ pointerEvents: confirmLoading ? 'none' : '' }}
                maskClosable={!confirmLoading}
            >
                <MyTable rowKey={(record: IRole) => record.Id + '' as string} columns={this.state.columns}
                    rowSelection={rowSelection}
                    dataSource={toJS(roleData)}
                    scroll={{ x: 1000 }}
                    size="default" />
            </Modal>
        )
    }
}

export default SelectRoleModal;
