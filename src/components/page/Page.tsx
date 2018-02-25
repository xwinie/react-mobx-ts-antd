import React from 'react';
import {Breadcrumb, Spin} from 'antd';
import QueueAnim from 'rc-queue-anim'
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import './page.scss'
import {IRoute} from "../../model/auth";


interface PageProps {
    loading: boolean
    title: string
    animConfig?: any
    breadcrumb?: Array<IRoute>
}

class Page extends React.Component<PageProps, any> {

    static defaultProps = {
        loading: false,
        animConfig: {
            opacity: [1, 0]
        },
        title: null,
        breadcrumb: []

    };

    getBreadcrumb(breadcrumb: Array<IRoute>) {

        return breadcrumb.map((v: IRoute, i: number) => {

            if (v.path) {
                return (
                    <Breadcrumb.Item key={i}><Link to={v.path}>{v.name}</Link></Breadcrumb.Item>
                )
            } else {
                return (
                    <Breadcrumb.Item key={i}>{v.name}</Breadcrumb.Item>
                )
            }

        })

    }

    render() {

        const titleName = this.props.title;
        const documentTitle = titleName === null ? '管理台' : '管理台' + '|' + titleName;

        return (
                <QueueAnim className="admin-framework-page" animConfig={this.props.animConfig} delay={100}>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>{ documentTitle }</title>
                    </Helmet>
                    <Breadcrumb className="admin-breadcrumb">
                        {this.getBreadcrumb(this.props.breadcrumb as Array<IRoute>)}
                    </Breadcrumb>
                    <Spin key="admin-framework-page" spinning={this.props.loading} size="large">
                        <div className="page-content">
                            {this.props.children}
                        </div>
                    </Spin>
                </QueueAnim>
        )
    }
}

export default Page
