const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  optimization: {
    minimize: false
  },  
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new (require('html-webpack-plugin'))
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx',{
              pragma:'create'
            }]]
          }
        }
      }
    ]
  }
}