'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    main: helpers.root('src', 'main')
  },
  resolve: {
    alias: {
      '~': helpers.root('src'),
    },
    extensions: [
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        include: [
          helpers.root('src')
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gabble | Chat',
      template: 'public/index.ejs',
      favicon: 'public/favicon.png',
      meta: {
        'description': 'Gabble a nice chat',
        'theme-color': '#dac8b3'
      }
    })
  ]
};

module.exports = config;
