'use strict'
// 首先引入的是webpack的merge插件，该插件是用来合并对象，也就是配置文件用的，相同的选项会被覆盖
const merge = require('webpack-merge')
// 导入prod.env.js配置文件
const prodEnv = require('./prod.env')
//由于webpack.DefinePlugin插件直接做的是文本替换，
// 所以给定的值必须包含字符串本身内的实际引号
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'//写成 '"development"'或者 JSON.stringify('production')
})
