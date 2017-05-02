/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to docs/ by default
 */

'use strict';

var webpack = require('webpack');
var postCss = require('./postcss.config.js');

module.exports = {

  output: {
    publicPath: '/assets/',  //publicPath是最终布署到服务器时的地址
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/components/YeomanGruntApp.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postCss'
    },{
      test: /\.json/,
      loader: 'json-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!postCss!sass-loader?outputStyle=expanded'
      //loader后面的loader插件
    }, {
      test: /\.(png|jpg|jpeg|woff|woff2)$/,
      loader: 'url-loader?limit=14000'
    }]
  }
};
