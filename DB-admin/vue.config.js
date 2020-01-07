// vue.config.js

const webpack = require('webpack');
module.exports = {
  /**
     * 以下是适应egg框架所做的文件目录配置
     *****************************************************************************************************************/
  publicPath: process.env.NODE_ENV === 'production'
    ? './../' // 生产环境
    : './', // 开发环境
  // 将构建好的文件输出到哪里

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: 'public', // 这两个都是相对于outputDir的，也就是dist
  indexPath: 'view/index.html', // 这些配置适应egg框架

  /** ***************************************************************************************************************/

  /* 以下是webpack常规配置*/

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [/* string or regex */],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md

  // chainWebpack: config => {
  //         config.module
  //           .rule('images')
  //             .use('url-loader')
  //               .loader('url-loader')
  //               .tap(options => Object.assign(options, { limit: 10240 }))
  //       },


  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins.push(new webpack.DefinePlugin({
        // 部署到egg框架时，环境变量为空
        'API_HOST': '""'
      }));
    } else {
      // 为开发环境修改配置...
      config.plugins.push(new webpack.DefinePlugin({
        // 一个环境变量，用于管理api
        'API_HOST': '"http://39.106.133.124:7001"'
        // 这里注意，必须写成这种引号套引号的形式，或者写成JSON.stringify('string')这样。
      }));
    }
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-plugin-px2rem')({
            rootValue: 16, // 换算基数，把根标签的字体规定为1rem为16px
            unitPrecision: 8, // 允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 1 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: { },
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    hot: true,
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    // proxy: {},
    before: app => { }
  }

}
