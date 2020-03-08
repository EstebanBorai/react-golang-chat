const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MODE = {
  DEV: 'development',
  PROD: 'production'
}

module.exports = (env, args) => {
  const isDev = args.mode === MODE.DEV;
  const isProd = args.mode === MODE.PROD;

  const config = {
    module: {}
  };

  if (isDev) {
    // If you are using TypeScript remember to set
    // source-map: true in your tsconfig.json
    config.devtool = 'source-map';
  }

  config.entry = './src/main.vue';

  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  }

  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ];

  config.plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './public/index.ejs',
      filename: 'index.html',
      title: 'simple-ws-in-go'
    })
  ]
  
  if (isDev) {
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
      inline: true,
      compress: true,
      port: 8080,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1500,
      },
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false
      }
    };
  }

  if (isProd) {
    config.plugins.push(new CleanWebpackPlugin());
  }

  config.resolve = {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  };

  return config;
}
