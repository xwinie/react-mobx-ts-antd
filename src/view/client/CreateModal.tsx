"use strict";
import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
const FormItem = Form.Item;


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

        const { visible, form, confirmLoading } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
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
                style={{ pointerEvents: confirmLoading ? 'none' : '' }}
                maskClosable={!confirmLoading}
            >
                <Form>
                    <FormItem
                        label="客户端名称"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('Name', {
                            rules: [{ required: true, message: '输入客户端名称!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}

export default Form.create<any>()(CreateModal)