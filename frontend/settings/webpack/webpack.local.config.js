const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');

config.entry = {
  main: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, '../../src/index_')
  ]
};

config.devtool = 'inline-sourcemap';
config.output = {
  path: path.join(__dirname, '../../assets/static/builds-development/'),
  filename: '[name]-[hash].js',
  publicPath: 'http://0.0.0.0:3000/static/builds/',
};

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new BundleTracker({ filename: '../../webpack/webpack-stats.dev.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_URL: JSON.stringify('http://0.0.0.0:8000/'),
    }
  })
];

config.module.loaders[0].query.plugins = ['react-hot-loader/babel'];

config.devServer = {
  inline: true,
  progress: true,
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3000
};

module.exports = config;
