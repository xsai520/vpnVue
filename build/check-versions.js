//本文件是用来检测node和npm版本的
'use strict'
const chalk = require('chalk')//作用是在控制台中输出不同颜色的字
const semver = require('semver') //用来对特定的版本号做判断
const packageConfig = require('../package.json')//导入package.json文件，使用里面的engines选项
const shell = require('shelljs') //用来执行unix系统命令

function exec (cmd) {
  //脚本可以通过child_process模块新建子进程，从而执行unix系统命令
  //下面这段代码实际就是把cmd这个参数传递的值转化成前后没有空格的字符串，即版本号
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',//node版本的信息
    currentVersion: semver.clean(process.version),//使用semver插件把版本信息转化成规定格式
    //这是规定的package.json中engines选项的node版本信息
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    //自动调用npm --version 命令，并且把参数返回给exec函数，从而获取纯净的版本号
    currentVersion: exec('npm --version'),
    //这是规定package.json中engines选项的node版本信息 npm
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      //如果版本号不符合package.json文件中指定的版本号,就执行下面的代码
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
        //给用户提示具体合适的版本，当前版本用红色字体，符合要求版本的用绿色字体
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
    //提示用户更新版本
  }
}
