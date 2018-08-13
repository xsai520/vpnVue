'use strict'
const utils = require('./utils')
const config = require('../config')
/*我的理解：这个文件主要是根据NODE_ENV这个变量分析是否是生产环境，
然后根据不同的环境来加载，判断是否开启了sourceMap的功能。
方便之后在cssLoaders中加上sourceMap功能。然后判断是否设置了cacheBusting属性，
它指的是缓存破坏，特别是进行sourceMap debug时，设置成false是非常有帮助的。
最后就是一个转化请求的内容，video、source、img、image等的属性进行配置。
具体的还是需要去了解vue-loader这个webpack的loader加载器。*/
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting, //缓存破坏
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
