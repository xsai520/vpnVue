'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//由于webpack.DefinePlugin插件直接做的是文本替换，
// 所以给定的值必须包含字符串本身内的实际引号
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'//写成 '"development"'或者 JSON.stringify('production')
})
