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
        
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'resolve-url-loader'
        },
        {
          loader: 'sass-loader'
        }]
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
