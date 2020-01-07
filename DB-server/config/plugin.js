'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
  
// };
exports.ejs={ 
  enable:true, 
  package:'egg-view-ejs',
};

//mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
//跨域调用插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
