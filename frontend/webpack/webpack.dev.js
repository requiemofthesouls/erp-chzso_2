// development config
const { resolve } = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const BundleTracker = require('webpack-bundle-tracker');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:3000',// bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './index.jsx' // the entry point of our app
  ],
  output: {
    filename: 'index_bundle.js',
    path: resolve(__dirname, '../static/builds-development'),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    hot: true, // enable HMR on the server
    port: 3000

  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new BundleTracker({ filename: 'frontend/static/builds-development/webpack-stats.dev.json' }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR update
    new CopyPlugin([
      {
        from: resolve(__dirname, '../src/assets/icons/favicon.ico'),
        to: resolve(__dirname, '../static/builds-development/favicon.ico'),
        toType: 'file',
      },
      {
        from: resolve(__dirname, '../src/assets/manifests/index.json'),
        to: resolve(__dirname, '../static/builds-development/index.json'),
        toType: 'file',
      },])
  ],
});
