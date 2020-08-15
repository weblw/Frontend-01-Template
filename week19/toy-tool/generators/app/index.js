const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }
  collocting() {
    console.log('collocting!')
  }
  creating() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: 'test' }
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('create.js'),
      this.destinationPath('lib/create.js')
    )
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('lib/gesture.js')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html')
    )
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js')
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc')
    )
    this.yarnInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',      
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel',
      'babel-plugin-istanbul',
      '@babel/register',
      'html-webpack-plugin'
    ], { 'dev': true })
  }
}