const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const paths = require('../path');
const tsImportPluginFactory = require('./ts-import-plugin');
const Mode=process.env.NODE_ENV.trim();
const devMode= Mode ==='development' ? true:false;

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        use:[{
          loader: 'ts-loader',
          options:{  
            transpileOnly: true,
            getCustomTransformers:tsImportPluginFactory,
            compilerOptions: {
              module: 'es2015'
            }
          }
        }],
        exclude: /node_modules/
      },
      { 
        test:/\.less$/,
        use:[ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll:true,
            },
          },
          { 
            loader:'css-loader'
          },
          { 
            loader:'less-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll:true
            },
          },
          { 
            loader:'css-loader'
          },
          { 
            loader:'postcss-loader',
            options: {           
              plugins: (loader) => [
                  require('autoprefixer')(), 
              ]
            },
          },  
          {
            loader:'sass-loader'
          }      
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: devMode ? '[name].[ext]':'[name]-[hash:5].min.[ext]',
              limit: 20000,
              publicPath: devMode ? './images/':'./static/images',
              outputPath: 'static/images/'
            }
          }
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Traffic Analysis',
      template: paths.appHtml,
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css':'[name][hash:8].css',
      chunkFilename: '[id].css'
    }),
    new TsconfigPathsPlugin()
  ]
};