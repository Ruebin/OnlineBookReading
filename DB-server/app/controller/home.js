'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index');
  }
  async admin_index() {
    await this.ctx.render('index_admin');
  
  }
  async test() {
    // let targetDir = path.join(this.config.baseDir, 'app', "/public/userStorage/storage-2");

    
    // fs.mkdir(targetDir, { recursive: true }, function (err) {
    //   if (err) {
    //     console.log('nonono')
    //     return console.log('创建封面目录失败，目录已存在')
    //   }
    //   console.log('创建封面目录成功');
    // });

    let target1 = path.join(this.config.baseDir, 'app', "/public/publicStorage/cover/cover-1.jpg");
    let target2 = path.join(this.config.baseDir, 'app', "/public/publicStorage/book/book-1.pdf");
    
    let a =  fs.statSync(target1).size

    this.ctx.body = a
  }
}

module.exports = HomeController;
