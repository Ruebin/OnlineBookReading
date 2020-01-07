/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-06 20:41:44
 * @LastEditTime : 2020-01-07 00:21:35
 * @LastEditors  : Ruebin
 */
/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577977609440_8108';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  // 配置mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '39.106.133.124',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'reading_online_library',

    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // 配置JWT
  config.jwt = {
    secret: 'xiaoAqianduanzu',
  };
  // 允许跨域访问
  config.cors = {
    // origin: 'http://192.168.1.123:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  // 修改csrf
  config.security = {
    domainWhiteList: [ 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://192.168.1.243:8080' ],
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      enable: false,
      ignoreJSON: true,
    },
  };
  config.multipart = {
    // mode: 'file',
    fileSize: '80mb',
    fileExtensions: [
      '.foo',
      '.apk',
      '.pdf',
    ],
  };

  // 静态资源配置
  // config.static = {
  //   prefix: '/',
  //   dir: path.join(appInfo.baseDir, 'app/public'),
  // };

  return {
    ...config,
    ...userConfig,
  };
};
