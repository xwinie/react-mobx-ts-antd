/**
 * 定义整个项目的全局配置
 */

'use strict';

module.exports = {
    yh_api: {  // 对后端请求的相关配置
        host: 'http://localhost:8080',  // 调用ajax接口的地址, 默认值空, 如果是跨域的, 服务端要支持CORS
        path: '/api',  // ajax请求的路径
        timeout: 15000,  // 请求的超时时间, 单位毫秒
    }, log: {
        level: 'info',  // 日志级别, 类似slf4j中的root logger, 目前支持debug/info/warn/error 4种级别
        // 除了root logger以外, 也可以为每个logger单独设置级别
        debug: [],
        info: [],
        warn: [],
        error: ['loggerA', 'loggerB'],  // 示例, 对于loggerA和loggerB使用error级别, 其他logger使用默认的info级别
    },
    debug: true , // 是否开启debug模式
    SALT:'__admin__'
};