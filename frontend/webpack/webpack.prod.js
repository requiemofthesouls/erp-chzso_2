// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const commonConfig = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.jsx',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../static/builds'),
    publicPath: '/',
  },
  plugins: [
    new BundleTracker({ filename: 'frontend/static/builds/webpack-stats.prod.json' }),
    new CopyPlugin([
      {
        from: resolve(__dirname, '../src/public/favicon.ico'),
        to: resolve(__dirname, '../static/builds/favicon.ico'),
        toType: 'file',
      },
      {
        from: resolve(__dirname, '../src/public/index.json'),
        to: resolve(__dirname, '../static/builds/index.json'),
        toType: 'file',
      },]),
  ],
});
