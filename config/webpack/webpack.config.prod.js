const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const paths = require('../path');
const commonConfig = require('./webpack.config.common');

module.exports = merge.smart(commonConfig, {
  mode: 'production',
  entry: paths.appIndex,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name]-[hash:8].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
});