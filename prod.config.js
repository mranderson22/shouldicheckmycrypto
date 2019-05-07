const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.(jpg|png|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
        outputPath: '../',
        publicPath: '/dist'
          }
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
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })

    ]
  };
};
