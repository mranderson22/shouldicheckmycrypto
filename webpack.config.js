const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: ['./src/index.js', 'babel-polyfill'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|ico)$/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',

  plugins: [

    new HtmlWebpackPlugin({
      template: './src/index.html'
    })


  ]
};
