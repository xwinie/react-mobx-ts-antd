import {inject, observer} from "mobx-react";
import * as React from "react";
import {IAuth} from "../model/auth";
import Main from "./main/main";
import Login from "./login/login";

interface IndexPageProps {
    auth?: IAuth
}

@inject((store: IAuth) => ({
    auth: store
}))
@observer
export default class IndexPage extends React.Component<IndexPageProps, any> {

    render() {
        const iAuth = this.props.auth as IAuth;
        return (
            <div>
                {iAuth['auth'].isLogin ? <Main/> : <Login/>}
            </div>)
    }

}