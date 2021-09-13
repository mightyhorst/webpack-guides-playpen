const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    host: 'localhost',
    port: 5000,
    hot: true
  },
  entry: {
    app: {
      import: './src/index.js'
      // dependOn: 'shared'
    }
  },
  resolve: {
    mainFields: ['main:src', 'module', 'main']
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.svg/i,
        type: 'asset/inline'
      },
      {
        test: /\.txt/,
        type: 'asset/source',
        // type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 //4kb
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'PWA'
    }),
    // new BundleAnalyzerPlugin()
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.info(
        Number(percentage).toLocaleString(undefined, {
          style: 'percent',
          minimumFractionDigits: 0
        }),
        message,
        ...args
      );
    }),
    /**
     * @package Workbox
     */
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
