'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {  //loader 被用于转换某些类型的模块
    rules: [   //test 属性 用于标识出应该被对应的loader进行转换的某个或某些文件
                //use 属性 表示进行转换时，应该用哪个loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/element-ui/packages'),
          resolve('node_modules/element-ui/src')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
      // {
      //   test: /\.css$/,
      //   loader: 'postcss-loader!style-loaer!css-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('media/[name].[hash:7].[ext]')
      //   }
      // }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins:[
   // new OpenBrowserPlugin({url:'http://localhost:8080'}),
    new webpack.optimize.CommonsChunkPlugin('common.js'),//默认会把所有入口节点的公共代码提取出来,生成一个common.js
    new webpack.ProvidePlugin({
      jQuery:"jquery",
      $:"jquery"
    })
  ]
};
