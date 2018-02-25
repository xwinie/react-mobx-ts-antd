"use strict";
import React, {Component} from "react";
import {Form, Input, Modal} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {observer} from "mobx-react";
const FormItem = Form.Item;
const {TextArea} = Input;


interface FormProps extends FormComponentProps {
    onCancel: any
    onOk: any
    visible: boolean
    confirmLoading: boolean

}

@observer
class CreateModal extends Component<FormProps, any> {

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
                        label="角色编码"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Code', {
                            rules: [{required: true, message: '输入自定义角色编码!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="角色名称"
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
                        label="角色描述"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Password')(<TextArea rows={4}/>)}
                    </FormItem>

                </Form>
            </Modal>
        )
    }

}

export default Form.create<any>()(CreateModal)