'use strict'
const utils = require('./utils')//引入当前目录中的utils工具配置文件
const webpack = require('webpack')//引入webpack来使用webpack内置插件
const config = require('../config')//引入config目录中的index.js配置文件
//引入webpack-merge插件用来合并webpack配置对象，即可以把webpack配置文件拆分成几个小的模块，然后合并
const merge = require('webpack-merge')
const path = require('path')
//引入当前目录下的webpack.base.conf.js配置文件，主要配置的是打包各种文件类型的配置
const baseWebpackConfig = require('./webpack.base.conf')
//在webpack中拷贝文件和文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin')
//一个自动生成html的插件，能够把资源自动加载到html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
//用来把webpack的错误和日志收集起来，漂亮的展示给用户
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')//搜索端口
//process返回一个包含用户环境信息的对象
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//合并配置对象，将这个配置文件特有的配置添加替换到base配置文件中
const devWebpackConfig = merge(baseWebpackConfig, {
  module: { //将utils配置中的处理css类似文件的处理方法拿过来，并且不生成cssMap文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  //devtool是开发工具选项，用来指定如何生成sourcemap文件
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',//使用inline mode时，在开发工具(DevTools)的控制台(console)将显示消息
    historyApiFallback: { //任意404响应都可能需要被代替为index.html
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, //启用webpack的模块热替换特性
    contentBase: false, //将使用当前工作目录作为提供内容的目录，也可以修改其他目录 since we use CopyWebpackPlugin.
    compress: true,//一切服务都启用gzip
    host: HOST || config.dev.host,//指定使用一个host，默认使用localhost
    port: PORT || config.dev.port,//指定要鉴听请求的端口号
    open: config.dev.autoOpenBrowser,//是否启动自动打开浏览器
    overlay: config.dev.errorOverlay //在浏览器中显示一个全屏覆盖当有编译错误或警告
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,//此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable,//如果有单独的后端开发服务器api，并且希望在同域名下发送api请求
    quiet: true, //除了初始启动信息之外的任何内容都不会被打印到控制台，这也意味着来自webpack的错误或警告在控制台不可见 necessary for FriendlyErrorsPlugin
    watchOptions: { //监控文件相关的控制选项
      poll: config.dev.poll,//使用文件系统获取文件改动的通知
    }
  },
  plugins: [
    //因为这个插件直接做的文本替换，给定的值必须包含字符串本身内的实际引号
    new webpack.DefinePlugin({ //创建一个在编译时可以配置的全局常量
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),//模块热替换
    new webpack.NamedModulesPlugin(), //基于文件名给模块命名 HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'), //定义要拷贝的源目录
        to: config.dev.assetsSubDirectory,//定义要拷贝的目标目录
        //toType file 或者 dir 可选，默认是文件
        //force 强制覆盖先前的插件 可选 默认false
        //context 可选 默认是base context 可用 specific context
        //flatten 之拷贝文件不管文件夹，默认是false
        ignore: ['.*']//忽略拷贝指定的文件
      }
    ])
  ]
})
//webpack将运行由配置文件导出的函数，并且等待promise返回，便于需要异步地加载所需的配置变量。
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({ //出错友好处理插件
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors //如果出错就执行这块,其实是utils里面配置好的提示信息
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
