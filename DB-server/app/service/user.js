'use strict';

const Service = require('egg').Service;
const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const user_email = 'sherlock-y@foxmail.com';
const auth_code = 'oljuvmxcnotnjhaa';

const transporter = nodemailer.createTransport({
    service: 'qq',
    secureConnection: true,
    port: 465,
    auth: {
        user: user_email, // 账号
        pass: auth_code, // 授权码

    },
});

class UserService extends Service {
    //生成token函数
    createToken(data) {
        return JWT.sign(data, this.config.jwt.secret, {
            expiresIn: 24 * 60 * 60 * 1
            // expiresIn: 5*60*1, 
        });
    }
    //发送邮件函数
    send(target_email, subject, text, html) {
        const mailOptions = {
            from: user_email, // 发送者,与上面的user一致
            to: target_email,   // 接收者,可以同时发送多个,以逗号隔开
            subject: subject,   // 标题
            text: text,   // 文本
            html: html,
        };
        try {
            transporter.sendMail(mailOptions);
            return 'success';
        } catch (err) {
            return 'failure';
        }
    }
    // 登录接口
    async login(loginMsg) {
        var res = {};
        //将登录信息与数据库中的信息进行比对，存在该用户返回true
        const vertifyUser = await this.app.mysql.get('user', {
            user_name: loginMsg.user_name
        });

        if (!vertifyUser) {
            res.code = -2;
        } else {
            //验证该用户的密码是否正确
            if (vertifyUser.password != loginMsg.password) {
                res.code = -1;
            } else {
                const token = this.createToken({
                    user_name: loginMsg.user_name
                });

                res.userInfo = {
                    user_name: loginMsg.user_name
                };
                res.code = 1;
                res.token = token;
            }
        }
        return res;
    }


    async register(registerMsg) {
        let res = {};
        //将注册信息与数据库中的信息进行比对，存在该用户返回true
        const vertify_name = await this.app.mysql.select('user', {
            where: { user_name: registerMsg.user_name }
        })
        if (vertify_name.length) {
            res.msg = '该用户名已被注册,请重新注册';
            this.ctx.status = 400;
            return res
        }
        //注册成功，把新用户的信息存进数据库
        let storageres = await this.app.mysql.select('storage', {
            orders: [['storage_id', 'desc']],
            columns: ['storage_id']
        })
        let s_id, address;

        if (storageres.length === 0) {
            s_id = 1
        } else {
            s_id = parseInt(storageres[0].storage_id) + 1
        }
        address = "/public/userStorage/storage-" + s_id
        //为用户申请分区
        let applyStorage = await this.app.mysql.insert('storage', {
            storage_id: s_id,
            size: 1024,
            address: address
        })

        registerMsg.storage_id = s_id

        const result = await this.app.mysql.insert('user', registerMsg);
        if (result.affectedRows !== 1) {
            this.ctx.status = 400;
            res.msg = '注册失败';
            return res
        }

        //创建文件夹
        let targetDir = path.join(this.config.baseDir, 'app', address);;
        console.log(targetDir)
        fs.mkdir(targetDir, function (err) {
            if (err) {
                return console.log('创建目录失败，目录已存在')
            }
            console.log('创建目录成功');
            fs.mkdir(targetDir+'/cover',{ recursive: true }, function (err) {
                if (err) {
                    return console.log('创建封面目录失败，目录已存在')
                }
                console.log('创建封面目录成功');
            });
            fs.mkdir(targetDir+'/book',{ recursive: true }, function (err) {
                if (err) {
                    return console.log('创建书籍目录失败，目录已存在')
                }
                console.log('创建书籍目录成功');
            });
        });
        
        //注册成功，发送激活邮件
        const targetmail = registerMsg.email;
        const subject = "online library注册验证"
        const text = "online library 注册验证"
        const html = "<h2>Welcome to online library！您已注册成功，请点击链接前往登录</h2><a class='elem-a' href='http://39.106.133.124:7001/'><span class='content-elem-span'>点我前往登录</span></a>";
        const res1 = this.send(targetmail, subject, text, html);
        if (res1 == 'success') {
            res.msg = '注册成功， 激活邮件发送成功'
        }

        return res;
    }



    async vertifyUser(token) {
        let decode;
        try {
            decode = JWT.verify(token, "xiaoAqianduanzu");
            if (!decode || !decode.user_name) {
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
            console.log(decode.user_name);

            this.ctx.body = {
                msg: '用户已登录',
                user_name: decode.user_name
            };
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = UserService;
