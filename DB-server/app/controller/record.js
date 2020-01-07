'use strict';

const Controller = require('egg').Controller;

class RecordController extends Controller {
  async userRead() {

    const userName = this.ctx.state.user;
    // 用户的阅读记录
    const result1 = await this.app.mysql.query('select book.book_id,book_name,author,cover_address,comment_num,total_reading_duration,last_reading_duration,current_page from book, reading_record where book.book_id = reading_record.book_id and user_name = ?', [ userName ]);
    this.ctx.body = {
      data: result1,
      msg: '获取用户阅读记录成功',
    };

  }

  async publicRead() {
    // 统计书籍有多少人正在阅读,用到了派生表，分组查询
    const result = await this.app.mysql.query('SELECT book.book_id,book_name,author,cover_address,comment_num FROM book, (select book_id,COUNT(*) as nums from reading_record GROUP BY book_id) AS readnums WHERE book.book_id = readnums.book_id');
    console.log(result);
  }
  async recordRead() {
    const req = this.ctx.request.body;
    // 接口数据校验
    const rule = {
      book_id: {
        type: 'integer',
        required: true,
      },
      time: {
        type: 'integer',
        required: true,
      },
      current_page: {
        type: 'integer',
        required: true,
      },
    };
    try {
      await this.ctx.validate(rule, req);// 校验数据

    } catch (error) {
      console.log(error);
      this.ctx.status = 400;
      return this.ctx.body = '请求参数格式不合法';
    }
    req.user_name = this.ctx.state.user;
    const result = await this.ctx.service.record.recordRead(req);
    this.ctx.body = result;
  }

}

module.exports = RecordController;
