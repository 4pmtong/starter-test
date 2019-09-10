const webpack = require('webpack');
const merge = require('webpack-merge');

const paths = require('../path');
const commonConfig = require('./webpack.config.common');

module.exports = merge.smart(commonConfig, {
  mode: 'development',
  entry: paths.appIndex,
  output: {
    filename: 'static/js/[name]-bundle-[hash:8].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '8000',
    inline: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://backend.api.host',
        changeOrigin: true,
      }
    }
  }
})