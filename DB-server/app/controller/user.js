'use strict';
/**
 *  用户登录接口
 */
const Controller = require('egg').Controller;


class UserController extends Controller {

    //登录接口
    async login() {
        const { ctx } = this;
        //接口数据规则
        const rule = {
            user_name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        };

        var loginMsg = ctx.request.body;
        try {
            await ctx.validate(rule, loginMsg);//校验数据
        }
        catch (e) {
            console.log(e);
            ctx.status = 400;
            return ctx.body = '请求参数格式不合法'
        }
        let result = await ctx.service.user.login(loginMsg);

        let res = {};
        switch (result.code) {
            case -2:
                res.msg = '用户不存在';
                ctx.status = 400
                break;
            case -1:
                res.msg = '用户密码不正确';
                ctx.status = 400
                break;
            case 1:
                res.msg = '登录成功';
                res.data = result.userInfo;
                // 把token加入cookie
                ctx.cookies.set('egg_token', result.token, {
                    maxAge: 24 * 3600 * 1000,
                    httpOnly: true,
                    // overwrite:true,
                    signed: true,
                })
                ctx.state.user = loginMsg.user_name
                break;
        }
        ctx.body = res;
    }

    //注册
    async register() {
        const { ctx } = this;
        let registerMsg = ctx.request.body;
        console.log(registerMsg)
        //  ctx.body = "yes"
        //接口数据规则
        const rule = {
            user_name: { type: 'string', required: true },
            password: { type: 'string', required: true },
            email: { type: 'string', required: false },
            sex: { type: 'string', required: true },
            phone: { type: 'int', required: false }
        };

        try {
            await ctx.validate(rule, registerMsg);//校验数据

            let result = await ctx.service.user.register(registerMsg);
            ctx.body = result;
        }
        catch (e) {
            console.log(e);
            ctx.status = 400;
            return ctx.body = '请求参数格式不合法'
        }


    }


    //验证用户是否登录
    async vertify() {
        var token = this.ctx.cookies.get('egg_token', {
            signed: true,
        })
        if (token === undefined) {
            this.ctx.status = 401;
            return this.ctx.body = {
                msg: '未授权，请登录'
            }

        } else {
            await this.ctx.service.user.vertifyUser(token)

        }

    }
    //用户登出接口
    async logout() {

        try {
            this.ctx.cookies.set('egg_token', null);
            this.ctx.body = {
                msg: '注销成功'
            }
        } catch (e) {
            this.ctx.throw(400, '注销失败');
        }
    }

    //修改密码
    async modifyPassword() {
        let user_name = this.ctx.state.user;
        let req = this.ctx.request.body;
    }


    //获取用户信息接口
    async userMsg() {

        //1.多表连接查询，获取云盘信息和个人信息
        let res1 = await this.app.mysql.query('select user_name,email,password,sex,phone,size,used_size from user,storage where user.storage_id = storage.storage_id and user.user_name = ?', [this.ctx.state.user]);
        if (res1.length == 0) {
            this.ctx.status = 400;
            return this.ctx.body = {
                msg: '用户信息获取失败'
            }
        }

        //2.查询该用户最近阅读较久的书 用到了聚集函数
        let res2 = await this.app.mysql.query('select book.book_id, book_name,author,press,max(last_reading_duration) from reading_record,book where book.book_id = reading_record.book_id  and reading_record.user_name = ?', [this.ctx.state.user]);
        if (res2.length !== 0) {
            res1[0].lastLongReadBookId = res2[0].book_id
            res1[0].lastLongReadBookName = res2[0].book_name
            res1[0].lastReadingDuration = res2[0].last_reading_duration
        }

        //3. 

        this.ctx.body = {
            data: res1[0],
            msg: "获取用户信息成功"
        }

    }

}
module.exports = UserController;
