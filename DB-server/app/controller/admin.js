'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  
  async login() {
    const { ctx } = this;
    //接口数据规则
    const rule = {
      admin_name: { type: 'string', required: true },
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
    let result = await ctx.service.admin.login(loginMsg);

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
        res.data = result.adminInfo;
        // 把token加入cookie
        ctx.cookies.set('egg_admin_token', result.token, {
          maxAge: 24 * 3600 * 1000,
          httpOnly: true,
          // overwrite:true,
          signed: true,
        })
        ctx.state.admin = loginMsg.admin_name
        break;
    }
    ctx.body = res;
  }
  //验证用户是否登录
  async vertify() {
    var token = this.ctx.cookies.get('egg_admin_token', {
      signed: true,
    })
    if (token === undefined) {
      this.ctx.status = 401;
      return this.ctx.body = {
        msg: '未授权，请登录'
      }

    } else {
      await this.ctx.service.admin.vertifyadmin(token)

    }

  }
  //用户登出接口
  async logout() {

    try {
      this.ctx.cookies.set('egg_admin_token', null);
      this.ctx.body = {
        msg: '注销成功'
      }
    } catch (e) {
      this.ctx.throw(400, '注销失败');
    }
  }

}

module.exports = AdminController;
