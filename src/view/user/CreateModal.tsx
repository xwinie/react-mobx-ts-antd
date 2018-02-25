"use strict";
import React, {Component} from "react";
import {Form, Input, Modal, Radio} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {observer} from "mobx-react";
const FormItem = Form.Item;


interface UserFormProps extends FormComponentProps {
    onCancel: any
    onOk: any
    visible: boolean
    confirmLoading: boolean

}

@observer
class CreateModal extends Component<UserFormProps, any> {

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {

        this.props.form.validateFields((err, values) => {
            if (err) return;

            this.props.onOk(values)

        })

    }

    handleAfterClose() {
        this.props.form.resetFields()
    }

    render() {

        const {visible, form, confirmLoading} = this.props;
        const {getFieldDecorator} = form;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                title="新建"
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
                        label="账号"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Account', {
                            rules: [{required: true, message: '输入登录账号!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="姓名"
                        hasFeedback
                        extra="建议输入文字"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Name', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Password')(<Input type="password"/>)}
                    </FormItem>

                    <FormItem
                        label="用户类型"

                        {...formItemLayout}
                    >
                        {getFieldDecorator('UserType', {
                            initialValue: '0',
                        })(
                            <Radio.Group>
                                <Radio value="0">三方应用</Radio>
                                <Radio value="1">后端管理</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}

export default Form.create<any>()(CreateModal)