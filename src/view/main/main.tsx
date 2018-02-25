import * as React from "react";
import {inject, observer} from "mobx-react";
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import {ActionTag} from "ev-ui";
import {Icon, Layout, Menu} from "antd";
import {IAuth, IRoute} from "../../model/auth";
import Root from "./mainStyled";

const {Header, Footer, Sider, Content} = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface MainProps {
    auth?: IAuth
}


@inject('auth')
@observer
class Main extends React.Component<MainProps, any> {

    state = {
        collapsed: false,
        mode: 'inline',
        winHeight: 0,
        selectedMenuKey: 0
    };

    onCollapse(collapsed: boolean) {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }

    onLogout() {
        const iAuth = this.props.auth as IAuth;
        iAuth.setIsLogin(false);
        // Dialog.show(Login)
    }

    componentDidMount() {
        this.activeMenu();
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this))
    }

    resizeWindow() {
        this.setState({
            winHeight: document.body.clientHeight
        })
    }

    activeMenu() {
        const iAuth = this.props.auth as IAuth;
        iAuth.routes.filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).forEach((r: IRoute, i: number) => {
            if (new RegExp(r.path).test(window.location.hash)) {
                if (i > 0) {
                    this.setState({
                        selectedMenuKey: i
                    })
                }
            }
        })
    }

    render() {
        const iAuth = this.props.auth as IAuth;
        return (
            <Router>
                <Root>
                    <Layout style={{height: this.state.winHeight}}>
                        <Sider style={{minHeight: this.state.winHeight}} collapsible collapsed={this.state.collapsed}
                               onCollapse={this.onCollapse.bind(this)}>
                            <div className="logo">
                                <img src={require('../../res/img/ev.jpg')} alt=""/>
                            </div>
                            <Menu theme="light" mode={this.state.collapsed ? 'vertical' : 'inline'}
                                  defaultSelectedKeys={[this.state.selectedMenuKey + '']}>
                                {
                                    iAuth['routes'].filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).map((route: IRoute, index: number) => {

                                        if (route.subRoutes && route.subRoutes.filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).length > 0) {
                                            return (
                                                <SubMenu key={index}
                                                         title={<span><Icon type={route.icon || ''}/><span
                                                             className="nav-text">{route.name}</span></span>}>
                                                    {

                                                        route.subRoutes.filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).map((subRoute, subIndex) => (
                                                            <MenuItem key={index + '-' + subIndex}>
                                                                <Link
                                                                    to={route.path + subRoute.path}>{subRoute.name}</Link>
                                                            </MenuItem>
                                                        ))

                                                    }
                                                </SubMenu>
                                            )
                                        } else {
                                            return (
                                                <MenuItem key={index}>
                                                    <Link to={route.path}>
                                                        <Icon type={route.icon || ''}/>
                                                        <span className="nav-text">{route.name}</span>
                                                    </Link>
                                                </MenuItem>
                                            )
                                        }

                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header className='header'>
                                <div className="placeholder"></div>
                                <div className="user-info">
                                    <Icon type="user"/>
                                    <span
                                        className="user">{iAuth ? iAuth.userName : ''}</span>
                                </div>
                                <ActionTag iconField={<Icon type='logout'/>} textField='退出'
                                           onClick={this.onLogout.bind(this)}/>
                            </Header>
                            <Content className="main-content">
                                {
                                    iAuth['routes'].filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).map((route: IRoute, index: number) => {
                                        if (route.subRoutes && route.subRoutes.filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).length > 0) {
                                            return (
                                                <Switch key={index}>
                                                    {
                                                        route.subRoutes.filter((e: IRoute) => iAuth.hasAuthMenu(e.code)).map((subRoute: IRoute, subIndex: number) => (
                                                            <Route key={index + '-' + subIndex} exact={subRoute.exact}
                                                                   path={route.path + subRoute.path}
                                                                   component={subRoute.comp}/>
                                                        ))
                                                    }
                                                </Switch>
                                            )
                                        } else {
                                            return (
                                                <Route key={index} exact={route.exact} path={route.path}
                                                       component={route.comp}/>
                                            )
                                        }
                                    })
                                }
                            </Content>
                            <Footer style={{textAlign: 'center', padding: "0 0 10px"}}>
                                foundation-web
                            </Footer>
                        </Layout>
                    </Layout>
                </Root>
            </Router>
        )
    }
}

export default Main;

