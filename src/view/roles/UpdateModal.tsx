"use strict";

import React, {Component} from "react";
import {Form, Input, Modal, Switch} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {observer} from "mobx-react";
import {IRole} from "../../model/role";
const FormItem = Form.Item;
const {TextArea} = Input;


interface UserFormProps extends FormComponentProps {
    onCancel: any
    onOk: any
    visible: boolean
    confirmLoading: boolean
    initialValue: IRole

}

@observer
class UpdateModal extends Component<UserFormProps, any> {

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {

        this.props.form.validateFields((err: any, values: IRole) => {
            if (err) return;
            this.props.onOk(values)

        })

    }

    handleAfterClose() {
        this.props.form.resetFields()
    }

    render() {

        const {visible, form, confirmLoading, initialValue} = this.props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        return (
            <Modal
                visible={visible}
                title="修改"
                okText="确定"
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
                <Form>
                    <FormItem
                        label="Id"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Id', {
                            initialValue: initialValue ? initialValue.Id : "",
                            rules: [{required: true, message: 'Please input the title of collection!'}],
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="角色编码"
                        hasFeedback
                        extra="输入字符串"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Code', {
                            initialValue: initialValue ? initialValue.Code : "",
                            rules: [{required: true}],
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="角色描述"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Description', {
                            initialValue: initialValue ? initialValue.Description : "",
                        })(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="角色名称"
                        hasFeedback
                        extra="输入字符串"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Name', {
                            initialValue: initialValue ? initialValue.Name : "",
                            rules: [{required: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="是否锁住"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Locked', {
                            initialValue: initialValue ? initialValue.Locked == 1 ? false : true : false,
                        })(
                            <Switch checkedChildren="正常" unCheckedChildren="锁住"
                                    defaultChecked={initialValue ? initialValue.Locked == 1 ? false : true : false}/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}

export default Form.create<any>()(UpdateModal)
