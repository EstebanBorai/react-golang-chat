const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './public/index.ejs',
      filename: 'index.html',
      title: 'WebSockets with Golang and React!'
    })
  ],

  devServer: {
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
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      contexts: path.resolve(__dirname, 'src/contexts'),
      components: path.resolve(__dirname, 'src/ui/components'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      ui: path.resolve(__dirname, 'src/ui'),
    }
  }
};
