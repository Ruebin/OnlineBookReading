'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checkToken = app.middleware.checkToken({
    secret: "xiaoAqianduanzu"
  });


  router.get('/', controller.home.index);
  router.get('/admin', controller.home.admin_index);


  router.post('/api/v1/login', controller.user.login);
  router.post('/api/v1/register', controller.user.register);
  router.get('/api/v1/logout', controller.user.logout);
  router.get('/api/v1/verifyUser', controller.user.vertify);
  //获取用户信息
  router.get('/api/v1/userMsg', checkToken, controller.user.userMsg);

  //
  router.get('/api/v1/book/public',controller.book.showPublic);
  router.get('/api/v1/book/private',checkToken, controller.book.showPrivate);
  router.post('/api/v1/book/public',controller.book.uploadToPublic);
  router.post('/api/v1/book/private',checkToken ,controller.book.uploadToPrivate);
  router.put('/api/v1/book',controller.book.update);
  router.delete('/api/v1/book',controller.book.delete);

  //查找
  router.get('/api/v1/book/search', controller.book.searchBook);

  //记录
  router.get('/api/v1/book/record',checkToken, controller.record.userRead);
  router.post('/api/v1/book/record', checkToken, controller.record.recordRead);

  //评论
  router.post('/api/v1/book/comment',checkToken, controller.comment.upload);
  router.get('/api/v1/book/comment', controller.comment.show);

  //管理员
  router.post('/api/v1/admin/login', controller.admin.login);
  router.get('/api/v1/admin/logout', controller.admin.logout);
  router.get('/api/v1/admin/verifyAdmin', controller.admin.vertify);

  //测试
  router.get('/test', controller.home.test);


};
