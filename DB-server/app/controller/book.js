
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class BookController extends Controller {

  // 上传图书至公共图书馆
  async uploadToPublic() {

    const res = {};
    // 接收文件的形式接收参数
    const parts = this.ctx.multipart();
    let part;
    const insertInfo = {};
    insertInfo.is_public = 'true';
    insertInfo.belong = '公共';
    const totalSize = 0;
    const result0 = await this.app.mysql.select('book', {
      columns: [ 'book_id' ],
      orders: [[ 'book_id', 'desc' ]],
    });
    const id = result0.length === 0 ? 1 : parseInt(result0[0].book_id) + 1;
    insertInfo.book_id = parseInt(id);
    while ((part = await parts()) != null) {
      console.log(part);
      if (part.length) {
        // arrays are busboy fields
        if (part[0] === 'book_name') {
          insertInfo.book_name = part[1];
        }
        if (part[0] === 'author') {
          insertInfo.author = part[1];
        }
        if (part[0] === 'press') {
          insertInfo.press = part[1];
        }
        if (part[0] === 'type') {
          insertInfo.type = part[1];
        }

      } else {
        // 接收图片文件上传
        if (!part.filename) {
          continue;
        }
        let target;
        if (part.fieldname === 'image') {
          console.log(part);
          // 判断图片类型
          let type = part.mimeType.replace('image/', '');
          if (type === 'jpeg') { type = 'jpg'; }
          const url = '/public/publicStorage/cover/cover-' + id + '.' + type;
          insertInfo.cover_address = url;
          target = path.join(this.config.baseDir, 'app', url);

        }
        if (part.fieldname === 'file') {
          console.log(part);
          const type = part.mimeType.replace('application/', '');
          const url = '/public/publicStorage/book/book-' + id + '.' + part.mimeType.replace('application/', '');
          insertInfo.book_address = url;
          target = path.join(this.config.baseDir, 'app', url);

        }
        const writeStream = fs.createWriteStream(target);
        await pump(part, writeStream);
      }
    }

    // 校验数据
    const rule = {
      book_name: { type: 'string', required: true },
      author: { type: 'string', required: true },
      press: { type: 'string', required: true },
      type: { type: 'string', required: true },
      belong: { type: 'string', required: true },
      is_public: { type: 'string', required: true },
      cover_address: { type: 'string', required: true },
      book_address: { type: 'string', required: true },
    };
    try {
      await this.ctx.validate(rule, insertInfo);// 校验数据
    } catch (error) {
      res.msg = '参数格式不对';
      this.ctx.status = 400;
      return this.ctx.body = res;
    }
    const result = await this.ctx.service.book.insert(id, insertInfo);
    res.msg = (result === true) ? '上传图书成功' : '上传图书失败';
    res.book_id = (result === true) ? id : null;
    this.ctx.body = res;

  }
  // 上传图书至个人图书馆
  async uploadToPrivate() {
    const res = {};
    // 接收文件的形式接收参数
    const parts = this.ctx.multipart();
    let part;
    const insertInfo = {};
    insertInfo.is_public = 'false';
    // 获取用户名
    insertInfo.belong = this.ctx.state.user;
    const result = await this.app.mysql.get('user_storage', {
      user_name: this.ctx.state.user,
    });
    console.log(result);
    const storageAddress = result.address;
    const result0 = await this.app.mysql.select('book', {
      columns: [ 'book_id' ],
      orders: [[ 'book_id', 'desc' ]],
    });
    const id = result0.length === 0 ? 1 : parseInt(result0[0].book_id) + 1;
    insertInfo.book_id = parseInt(id);
    while ((part = await parts()) != null) {

      if (part.length) {
        // arrays are busboy fields
        if (part[0] === 'book_name') {
          insertInfo.book_name = part[1];
        }
        if (part[0] === 'author') {
          insertInfo.author = part[1];
        }
        if (part[0] === 'press') {
          insertInfo.press = part[1];
        }
        if (part[0] === 'type') {
          insertInfo.type = part[1];
        }
        if (part[0] === 'is_public') {
          insertInfo.is_public = part[1];
        }

      } else {
        // 接收图片文件上传
        if (!part.filename) {
          continue;
        }
        let target;
        if (part.fieldname === 'image') {
          // 判断图片类型
          let type = part.mimeType.replace('image/', '');
          if (type === 'jpeg') { type = 'jpg'; }

          const url = storageAddress + '/cover/cover-' + id + '.' + type;
          insertInfo.cover_address = url;
          target = path.join(this.config.baseDir, 'app', url);

        }
        if (part.fieldname === 'file') {

          const type = part.mimeType.replace('application/', '');

          const url = storageAddress + '/book/book-' + id + '.' + type;
          insertInfo.book_address = url;
          target = path.join(this.config.baseDir, 'app', url);

        }
        const writeStream = fs.createWriteStream(target);
        await pump(part, writeStream);
      }
    }


    // 校验数据
    const rule = {
      book_name: { type: 'string', required: true },
      author: { type: 'string', required: true },
      press: { type: 'string', required: true },
      type: { type: 'string', required: true },
      belong: { type: 'string', required: true },
      is_public: { type: 'string', required: true },
      cover_address: { type: 'string', required: true },
      book_address: { type: 'string', required: true },
    };
    try {
      await this.ctx.validate(rule, insertInfo);// 校验数据
    } catch (error) {
      res.msg = '参数格式不对';
      this.ctx.status = 400;
      return this.ctx.body = res;
    }
    const result1 = await this.ctx.service.book.insertPrivate(id, insertInfo);
    res.msg = (result1 === true) ? '上传图书成功' : '上传图书失败';
    res.book_id = (result1 === true) ? id : null;
    this.ctx.body = res;

  }

  // 查看个人图书馆中的书
  async showPrivate() {

    try {
      const result = await this.app.mysql.select('private_book', {
        user_name: this.ctx.state.user,
      });
      this.ctx.body = {
        data: result,
        msg: '获取个人图书信息成功',
      };
    } catch (error) {
      this.ctx.body = {
        msg: '获取个人图书信息失败',
      };
    }

  }
  // 查看公共图书馆的书
  async showPublic() {
    try {
      const result = await this.app.mysql.select('public_book');
      this.ctx.body = {
        data: result,
        msg: '获取公共图书信息成功',
      };
    } catch (error) {
      this.ctx.body = {
        msg: '获取个人图书信息失败',
      };
    }
  }
  // 根据id查看书籍详情
  async showBook() {
    const id = parseInt(this.ctx.query.id);
    // 统计详细信息
    const result = await this.app.mysql.get('book', {
      book_id: id,
    });
    return result;

  }

  // 查找关键字，模糊查询
  async searchBook() {
    const res = {};
    let keyword = this.ctx.query.keyword;
    keyword = '%' + keyword + '%';
    console.log(keyword);
    // 优先根据书名查找 模糊查找
    const result = await this.app.mysql.query('select * from book where book_name like ?', [ keyword ]);
    if (result.length === 0) {
      // 查找不到，按作者查找
      const result1 = await this.app.mysql.query('select * from book where author like ?', [ keyword ]);
      if (result1.length === 0) {
        this.ctx.status = 400;
        return this.ctx.body = {
          msg: '查找不到',
        };
      }
      res.data = result1;
      res.msg = '查找成功';
      return this.ctx.body = res;
    }
    res.data = result;
    res.msg = '查找成功';
    this.ctx.body = res;


  }


  // 更新图书
  async update() {
    const res = {};
    let id;

    // 接收文件的形式接收参数
    const parts = this.ctx.multipart();
    let part;
    const updateInfo = {};
    // updateInfo.is_public = 'true'
    // updateInfo.belong = '公共';

    while ((part = await parts()) != null) {
      console.log(part);
      if (part.length) {
        if (part[0] === 'book_id') {
          id = part[1];
        }
        if (part[0] === 'book_name') {
          updateInfo.book_name = part[1];
        }
        if (part[0] === 'author') {
          updateInfo.author = part[1];
        }
        if (part[0] === 'press') {
          updateInfo.press = part[1];
        }
        if (part[0] === 'type') {
          updateInfo.type = part[1];
        }
        if (part[0] === 'is_public') {
          updateInfo.is_public = part[1];
        }

      } else {
        // 接收图片文件上传
        if (!part.filename) {
          continue;
        }
        let target;
        if (part.fieldname === 'image') {
          // 判断图片类型
          let type = part.mimeType.replace('image/', '');
          if (type === 'jpeg') { type = 'jpg'; }
          const url = '/public/publicStorage/cover/cover-' + id + '.' + type;
          updateInfo.cover_address = url;
          target = path.join(this.config.baseDir, 'app', url);

        }
        if (part.fieldname === 'file') {
          console.log(part);
          const type = part.mimeType.replace('application/', '');
          const url = '/public/publicStorage/book/book-' + id + '.' + type;
          updateInfo.book_address = url;
          target = path.join(this.config.baseDir, 'app', url);

        }
        const writeStream = fs.createWriteStream(target);
        await pump(part, writeStream);
      }
    }

    // 校验数据
    const rule = {
      book_name: { type: 'string', required: false },
      author: { type: 'string', required: false },
      press: { type: 'string', required: false },
      type: { type: 'string', required: false },
      is_public: { type: 'string', required: false },
      cover_address: { type: 'string', required: false },
      book_address: { type: 'string', required: false },

    };
    try {
      await this.ctx.validate(rule, updateInfo);// 校验数据
    } catch (error) {
      res.msg = '参数格式不对';
      this.ctx.status = 400;
      return this.ctx.body = res;
    }
    const result = await this.ctx.service.book.update(id, updateInfo);
    res.msg = (result === true) ? '更新图书成功' : '更新图书失败';
    res.book_id = (result === true) ? id : null;
    this.ctx.body = res;
  }

  // 删除图书馆中的书
  async delete() {
    const res = {};

    // var id = parseInt(this.ctx.query.id);
    const id = parseInt(this.ctx.request.body.book_id);

    const result = await this.ctx.service.book.destroy(id);
    res.msg = result === true ? '删除章节成功' : '删除章节失败';
    this.ctx.body = res;
  }
}

module.exports = BookController;
