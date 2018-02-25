import {inject, observer} from "mobx-react";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Button, Form, Input, message, Spin} from "antd";
import {FormComponentProps} from "antd/lib/form/Form";
import {IAuth} from "../../model/auth";
import "./index.scss";
import api from "../../model/api";
const FormItem = Form.Item;


interface LoginProps {
    auth?: IAuth
}

@inject('auth')
@observer
class Login extends React.Component<LoginProps & FormComponentProps & RouteComponentProps<{}>, {}> {

    state = {
        loading: false
    };


    login = (e: Event): void => {
        e.preventDefault();
        const {history} = this.props;

        const iAuth = this.props.auth as IAuth;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                api.Login(values.username, api.encryptionPassword(values.username, values.password))
                    .then(function (response) {
                        if (response.status > 300) {
                            message.error(response.data.msg, 2.5);
                        }else if(!response.data.ID){
                            message.error('请联系管理员！', 2.5);
                        }
                        api.getMenus(response.data.ID, response.data.Token).then(
                            function (res) {
                                if (res.data && res.status < 300) {
                                    iAuth.setData(response.data.Account, response.data.Name, response.data.Token, response.data.Exp, true, response.data.Id, res.data);
                                    localStorage.setItem("token",  iAuth.ValidToken)
                                } else {
                                    history.push('/');
                                }
                            }
                        ).catch(function (error) {
                            message.error(error.response.data.msg, 2.5);
                        });
                    })
                    .catch(function (error) {
                        message.error(error.response.data.msg, 2.5);
                    });


                history.push('/');
                this.setState({loading: false});

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-page">
                <div className="login-box">
                    <img src={require('./logo.png')} alt="logo" className="logo"/>
                    <Spin spinning={this.state.loading} size="large">
                        <Form className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入账户名'
                                        }
                                    ],
                                })(
                                    <Input placeholder="账户"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ],
                                })(
                                    <Input autoComplete="off" type="password" placeholder="密码"/>
                                )}
                            </FormItem>
                            <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                        </Form>
                    </Spin>
                </div>
            </div>
        )
    }
}

export  default Form.create<LoginProps>()(withRouter(Login));