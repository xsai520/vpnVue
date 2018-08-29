'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
//处理路径统一的问题
const path = require('path')
//生产环境编译环境下的一些配置
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',//静态资源文件夹
    assetsPublicPath: '/',//发布路径
    proxyTable: {},//配置代理

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,//是否自动打开浏览器
    errorOverlay: true,//查询错误
    notifyOnErrors: true,//通知错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  //poll是跟devServer相关的一个配置，webpack为我们提供devServer是可以监控文件改动的，但在有些情况
  //却不能工作，我们可以设置一个轮询（poll）来解决
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,//一个配合devtool的配置，当给文件名插入新的hash导致清除缓存时是否生成source maps，默认在开发环境下为true

    cssSourceMap: true //是否开启cssSourceMap
  },

  build: {
    // Template for index.html 编译后index.html的路径
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths  定义静态资源的根目录 即是dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    //静态资源的根目录的子目录，也就是dist目录下面的static
    assetsSubDirectory: 'static',
    //静态资源的公开路径 也就是真正的引用路径
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
   //定义是否生成生产环境的sourcemap，sourcemap是用来debug编译后的文件的，通过映射到编译前文件来实现
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production

    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    //是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: false,
    // 定义要压缩哪些类型的文件
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    //用来开启编译完成后的报告，可以通过设置值为true和false来开启或者关闭
    //下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
