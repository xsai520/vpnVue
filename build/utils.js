'use strict'
const path = require('path')
const config = require('../config')//引入config目录下的index.js配置文件
//用来将css提取到单独的css文件中，该插件主要是为了抽离css样式，防止将样式打包在js中引起页面样式加载错乱的现象
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
//导出assetsPath
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' //判断是否是生产环境
    ? config.build.assetsSubDirectory // static
    : config.dev.assetsSubDirectory //static
 //path.join 和 path.posix.join 前者返回的是完整的路径 ，后者返回的是完整路径的相对根路径
  //前者返回C:/a/a/b/xiangmu/b。或者返回b，返回一个干净的相对路径
  return path.posix.join(assetsSubDirectory, _path)
}
//导出cssLoaders的相关配置
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap //是否开始cssmap，默认是false
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) { //当options.extract为true的时候把文件单独提取出来，false表示不单独提取出来
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
//主要用来处理import这种方式导入的文件类型的打包，上面的exports.cssLoader是为这一步服务的
exports.styleLoaders = function (options) {
  const output = []
  //生成的各种css文件的loader对象
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    //把每一种文件的loader都提取出来
    const loader = loaders[extension]
    output.push({
      //把最终的结果都push到output数组中
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier') //发送桌面消息

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
