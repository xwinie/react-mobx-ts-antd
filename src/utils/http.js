'use strict'

import axios from "axios";
import qs from "qs";


export default {
    post (url, data) {
        return axios({
            method: 'post',
            baseURL: 'api',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // 'Authorization': "HmacSHA512 " + ACCESS_KEY + ":" + nonce + ":" + CryptoJS.enc.Base64.stringify(sign)
            }
        }),
            get(url, params)
        {
            return axios({
                method: 'get',
                baseURL: 'api',
                url,
                params, // get 请求时带的参数
                timeout: 10000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
        }
    }
}