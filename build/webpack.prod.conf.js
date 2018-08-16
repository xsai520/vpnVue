'use strict'
const path = require('path')//引入nodejs的路径模块
const utils = require('./utils')//引入utils工具配置文件，主要用来处理css类文件的loader
const webpack = require('webpack')//引入webpack 来使用webpack的内置插件
const config = require('../config') //引入config目录下的index.js文件，主要定义了生产和开发环境的相关基础配置
const merge = require('webpack-merge')//用来处理配置对象合并，可以将一个大的配置对象拆分成几个小的，合并，相同的项将覆盖
const baseWebpackConfig = require('./webpack.base.conf')//处理不同类型文件的loader
const CopyWebpackPlugin = require('copy-webpack-plugin')//复制文件或者文件夹到指定的目录
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成html的文件，可以设置模板
const ExtractTextPlugin = require('extract-text-webpack-plugin')//这个插件是用来将bundle中的css等文件产出单独的bundle
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')//压缩css代码，还可以去掉extract-text-webpack-plugin插件抽离文件产生的重复代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//压缩es6

const env = require('../config/prod.env') //导入环境

//把当前的配置对象和基础的配置合并
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    //把utils配置好的处理各种css类型的配置拿过来，和dev设置一样，就是这里多了个
    //extract:true  此项是自定义项,设置true表示，生成独立的文件
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  //devtool开发工具，用来生成个sourcemap方便调试
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    //打包后的文件放在dist目录里
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({ //利用definePlugin插件，定义process.env环境变量为env
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: { //UglifyJsPlugin插件是专门用来压缩js文件的
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({ //生成独立的css文件，下面是生成独立css文件的名称
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      // 压缩css文件
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    //生成html页面
    new HtmlWebpackPlugin({
      //非测试环境生成index.html
      filename: config.build.index,
      // 模板是index.html加不加无所谓
      template: 'index.html',
      // 将js文件放到body标签的结尾
      inject: true,
      minify: {
        // 压缩产出后的html页面
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' //分类要插到html页面的模块
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // 下面的插件是将打包后的文件中的第三方库文件抽取出来，便于浏览器缓存，提高程序的运行速度
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 把webpack的runtime代码和module manifest代码提取到manifest文件中，防止修改了代码但是没有修改第三方库文件导致第三方库文件也打包的问题
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
