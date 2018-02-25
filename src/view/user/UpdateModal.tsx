"use strict";

import React, {Component} from "react";
import {Form, Input, Modal, Radio, Switch} from "antd";
import {FormComponentProps} from 'antd/lib/form';
import {observer} from "mobx-react";
import {IUser} from "../../model/user";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


interface UserFormProps extends FormComponentProps {
    onCancel: any
    onOk: any
    visible: boolean
    confirmLoading: boolean
    initialValue: IUser

}

@observer
class UpdateModal extends Component<UserFormProps, any> {

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {

        this.props.form.validateFields((err: any, values: IUser) => {
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
                        label="账号"
                        hasFeedback
                        extra="输入字符串"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Account', {
                            initialValue: initialValue ? initialValue.Account : "",
                            rules: [{required: true}],
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="用户类型"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('UserType', {
                            initialValue: initialValue ? initialValue.UserType == 0 ? '0' : '1' : '1',
                        })(
                            <RadioGroup>
                                <Radio value="0">应用用户</Radio>
                                <Radio value="1">后端用户</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="用户名"
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
