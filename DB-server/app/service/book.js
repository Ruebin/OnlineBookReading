'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class BookService extends Service {
 
  async insert(id, insertInfo) {

    if (Object.keys(insertInfo).length === 0) {
      this.ctx.status = 400;
      return false;
    }

    insertInfo.book_id = id;
    let result = await this.app.mysql.insert('book', insertInfo)
    if (result.affectedRows === 1) {
      return true;
    }
    this.ctx.status = 400;
    return false;
  }


  async insertPrivate(id, insertInfo) {


    if (Object.keys(insertInfo).length === 0) {
      this.ctx.status = 400;
      return false;
    }


    //读取文件大小
    let target1 = path.join(this.config.baseDir, 'app', insertInfo.cover_address);
    let target2 = path.join(this.config.baseDir, 'app', insertInfo.book_address);
    
    let size1 = fs.statSync(target1).size
    let size2 = fs.statSync(target2).size

    let used_size = parseInt(size1) / (1024 *1024) + parseInt(size2) / (1024 *1024);
    used_size = used_size.toFixed(2)
    console.log(used_size)
    //更新云盘
    
    //嵌套查询
    let rr = await this.app.mysql.query('update storage set used_size=used_size + ? where storage_id in (select storage_id from user where user_name=?)',[used_size,this.ctx.state.user])


    insertInfo.book_id = id;
    let result = await this.app.mysql.insert('book', insertInfo)
    if (result.affectedRows === 1) {
      return true;
    }
    this.ctx.status = 400;
    return false;

    
  }

  async update(id, updateInfo) {
    if (Object.keys(updateInfo).length === 0) {
      this.ctx.status = 400;
      return false;
    }
    let result = await this.app.mysql.update('book', updateInfo, {
      where: {
        book_id: id
      }
    })

    console.log(result)
    if (result.affectedRows === 1) {
      return true;
    }
    this.ctx.status = 400;
    return false;

  }

  async destroy(id) {
    console.log(id)
    let result1 = await this.app.mysql.delete('book', {
      book_id: parseInt(id)
    });

    if (result1.affectedRows === 1) {
      return true;
    }
    this.ctx.status = 400;
    return false;
  }
}

module.exports = BookService;
