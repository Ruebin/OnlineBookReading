'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {

  async upload() {
    const req = this.ctx.request.body;
    const d = new Date();
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    const r = await this.app.mysql.insert('comments', {
      user_name: this.ctx.state.user,
      book_id: req.book_id,
      content: req.content,
      date,
    });
    if (r.affectedRows === 1) {
      return this.ctx.body = {
        msg: '上传评论成功',
        date,
      };
    }
    this.ctx.status = 400;
    this.ctx.body = {
      msg: '上传评论失败',
    };

  }

  async show() {
    const id = parseInt(this.ctx.query.book_id);

    try {
      const r = await this.app.mysql.query('select user_name,book_name,content,date from book,comments where book.book_id = comments.book_id and comments.book_id = ?', [ id ]);
      this.ctx.body = {
        data: r,
        msg: '获取评论成功',
      };
    } catch (error) {
      return this.ctx.body = {
        msg: '获取评论失败',
      };
    }

  }
  async delete() {


  }
}

module.exports = CommentController;
