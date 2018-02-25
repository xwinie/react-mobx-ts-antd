import * as React from "react";
import { IRoute } from "./auth";
import IndexView from "../view/index/Index";
import UserView from "../view/user";
import RoleView from "../view/roles";
import ClientView from "../view/client";

export const Routes: Array<IRoute> = [
    {
        code: '10034',
        path: '/',
        exact: true,
        name: '主页',
        icon: 'home',
        comp: () => <IndexView />
    },
    {
        code: '10034',
        path: '/user',
        name: '用户管理',
        icon: 'user',
        comp: () => <UserView />,
        subRoutes: [
            {
                code: '10033',
                path: '/goods',
                name: '商品中心',
                icon: 'home',
                comp: () => <UserView />
            }
        ]
    },{
        code: '10035',
        path: '/role',
        name: '角色管理',
        icon: 'eye',
        comp: () => <RoleView />
    } ,
    {
        code: '10036',
        path: '/client',
        name: '客户端管理',
        icon: 'eye',
        comp: () => <ClientView />
    }
];

