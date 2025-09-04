
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|avif|webp|svg)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  stats: 'minimal',
  performance: {
    hints: false
  },
};