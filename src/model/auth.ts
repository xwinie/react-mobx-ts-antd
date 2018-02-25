import {action, computed, observable, transaction, useStrict} from "mobx";
import {Routes} from "./Routes";
useStrict(true);

export interface IAuth {
    account: string
    userName: string
    token: string
    isLogin: boolean
    exp: number
    userId: string
    routes: Array<IRoute>
    menus: Array<IMenu>
    setIsLogin(isLogin: boolean): void
    setData(account: string, userName: string, token: string, exp: number, isLogin: boolean, userId: string, menus: Array<IMenu>): void
    hasAuthMenu(code: string): boolean
    ValidToken: string

}


export declare type IRoute = {
    code: string,
    path: string,
    exact?: boolean,
    name: string,
    icon?: string,
    comp?: any,
    subRoutes?: Array<IRoute>
};


export declare type IMenu = {
    Action: string,
    Code: string,
    Method?: string,
    ResourceId?: string
    RoleId?: string
};


class Auth {

    @observable account: string;
    @observable userName: string;
    @observable token: string;
    @observable isLogin: boolean;
    @observable exp: number;
    @observable userId: string;
    @observable routes: Array<IRoute>;
    @observable menus: Array<IMenu>;

    constructor() {
        this.setRoutes(Routes)
    }


    @action setData(account: string, userName: string, token: string, exp: number, isLogin: boolean, userId: string, menus: Array<IMenu>): void {
        transaction(() => {
            this.account = account;
            this.exp = exp;
            this.userName = userName;
            this.token = token;
            this.isLogin = isLogin;
            this.userId = userId;
            this.menus = menus;
        });

    }

    @action setIsLogin(isLogin: boolean): void {
        this.isLogin = isLogin;
    }

    @action setRoutes(routes: Array<IRoute>): void {
        this.routes = routes;
    }

    @action hasAuthMenu(code: string): boolean {
        // const result = this.menus.every((e) => e.Code === code);
        const result = this.menus.filter((e) => e.Code === code);
        // console.log(result);
        return result.length > 0
    }

    @computed get ValidToken(): string {
        return this.token
    }

}


export  default new Auth();