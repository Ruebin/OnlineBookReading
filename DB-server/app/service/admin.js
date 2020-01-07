'use strict';

const Service = require('egg').Service;

const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

class AdminService extends Service {
    createToken(data) {
        return JWT.sign(data, this.config.jwt.secret, {
            expiresIn: 24 * 60 * 60 * 1
            // expiresIn: 5*60*1, 
        });
    }
   async login(loginMsg) {
    var res = {};
        //将登录信息与数据库中的信息进行比对，存在该用户返回true
        const vertifyadmin = await this.app.mysql.get('admin', {
            admin_name: loginMsg.admin_name
        });

        if (!vertifyadmin) {
            res.code = -2;
        } else {
            //验证该用户的密码是否正确
            if (vertifyadmin.password != loginMsg.password) {
                res.code = -1;
            } else {
                const token = this.createToken({
                    admin_name: loginMsg.admin_name
                });

                res.adminInfo = {
                    admin_name: loginMsg.admin_name
                };
                res.code = 1;
                res.token = token;
            }
        }
        return res;
  }
  async vertifyadmin(token) {
    let decode;
    try {
        decode = JWT.verify(token, "xiaoAqianduanzu");
        if (!decode || !decode.admin_name) {
            this.ctx.status = 401;
            return this.ctx.body = {
                msg: '未授权，请登录'
            }

        }
        if (Date.now() / 1000 - decode.exp > 0) {
            this.ctx.status = 402;
            return this.ctx.body = {
                msg: '登录已过期，请重新登录'
            }
        }
        console.log(decode.admin_name);

        this.ctx.body = {
            msg: '用户已登录',
            admin_name: decode.admin_name
        };
    } catch (e) {
        console.log(e);
    }
}
}

module.exports = AdminService;
