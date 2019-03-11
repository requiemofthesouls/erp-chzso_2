// production config
const merge = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.jsx',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../static/builds'),
    publicPath: '/',
  },
  plugins: [],
});
