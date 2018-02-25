import axios from "axios";
import Crypto from "crypto-js";
import { IUser } from "./user";
import { IClient } from "./client";
import { IRole } from "./role";
//存放获取后台api地方
class api {

    encryptionPassword(userName: string, password: string): string {
        return Crypto.MD5(Crypto.SHA1(userName).toString() + Crypto.SHA1(password).toString()).toString();
    }

    //用户登录
    Login(username: string, password: string) {
        return axios.post('api/v1/login', {
            "username": username,
            "password": password
        });
    }

    //获取菜单
    getMenus(id: number, token: string) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/menus/" + id as string, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //获取用户信息
    getUsers(token: string, params: any) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/user", timeout: 10000, params: params,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //根据账号获取用户
    getUserByAccount(token: string, account: string) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/user/" + account, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //修改用户数据
    updateUser(token: string, id: string, data: IUser) {
        return axios({
            method: 'put', baseURL: 'api', url: "/v1/user/" + id, timeout: 10000, data: JSON.stringify(data),
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json;charset=utf-8'
            }
        });
    }

    //修改用户数据
    deleteUser(token: string, id: string) {
        return axios({
            method: 'delete', baseURL: 'api', url: "/v1/user/" + id, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //创建用户数据
    createUser(token: string, data: IUser) {
        return axios({
            method: 'post', baseURL: 'api', url: "/v1/user", timeout: 10000, data: JSON.stringify(data),
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json;charset=utf-8'
            }
        });
    }

    //获取角色信息
    getRoles(token: string, params: any) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/role", timeout: 10000, params: params,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    getRoleByCode(token: string, code: string) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/role/" + code, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //修改角色数据
    updateRole(token: string, id: string, data: IRole) {
        return axios({
            method: 'put', baseURL: 'api', url: "/v1/role/" + id, timeout: 10000, data: JSON.stringify(data),
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json;charset=utf-8'
            }
        });
    }

    //修改角色数据
    deleteRole(token: string, id: string) {
        return axios({
            method: 'delete', baseURL: 'api', url: "/v1/role/" + id, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //创建角色数据
    createRole(token: string, data: IRole) {
        return axios({
            method: 'post', baseURL: 'api', url: "/v1/role", timeout: 10000, data: JSON.stringify(data),
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json;charset=utf-8'
            }
        });
    }

    //获取所有资源
    getResourceAll(token: string) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/resource", timeout: 10000, params: { "perPage": 100000, "p": 1 },
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //根据角色获取所有资源
    getResourceByRoleId(token: string, roleId: string) {
        return axios({
            method: 'get', baseURL: 'api', url: `/v1/role/${roleId}/resource`, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //根据编码获取所有资源
    getResourceByCode(token: string, code: string) {
        return axios({
            method: 'get', baseURL: 'api', url: `/v1/resource/${code}`, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    //分配角色资源
    roleDistributorResource(token: string, roleId: string, data: Array<string>) {
        return axios({
            method: 'post',
            baseURL: 'api',
            url: `/v1/role/${roleId}/resource`,
            timeout: 10000,
            data: {
                resourceId: data
            },
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
    //分配用户角色
    userDistributorRole(token: string, id: string, data: Array<string>) {
        return axios({
            method: 'post',
            baseURL: 'api',
            url: `/v1/user/${id}/role`,
            timeout: 10000,
            data: {
                roleId: data
            },
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
    //根据用户获取所有角色
    getRoleByUserId(token: string, id: string) {
        return axios({
            method: 'get', baseURL: 'api', url: `/v1/user/${id}/role`, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
    //获取客户端信息
    getClients(token: string, params: any) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/client", timeout: 10000, params: params,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
    //创建客户端数据
    createClient(token: string, data: IClient) {
        return axios({
            method: 'post', baseURL: 'api', url: "/v1/client", timeout: 10000, data: JSON.stringify(data),
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json;charset=utf-8'
            }
        });
    }
    //修改用户数据
    lockClient(token: string, id: string, data: number) {
        return axios({
            method: 'PUT', baseURL: 'api', url: "/v1/client/" + id, timeout: 10000, data: {
                Locked: data
            },
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json;charset=utf-8'
            }
        });
    }
    //根据客户编码获取客户信息
    getClientByClientID(token: string, clientID: string) {
        return axios({
            method: 'get', baseURL: 'api', url: "/v1/client/" + clientID, timeout: 10000,
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
}

export default new api();

