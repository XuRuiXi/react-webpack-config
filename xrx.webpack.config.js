const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  performance: {
    "maxAssetSize": 1024 * 1024 // 1m 打包的asset资源，超过多少会提示
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    // publicPath: '',
    assetModuleFilename: 'resources/[name].[hash:5][ext]'
  },
  resolve: {
    extensions: ['.js', 'jsx', '.json', '.ts', 'tsx'],
  },
  devServer: {
    host: 'localhost',
    port: 5200,
    compress: true, // 服务器压缩
    open: false, // 自动打开页面
    hot: true, // 热更新(默认开启)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // 不处理的文件夹
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/, // 不处理的文件夹
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        // 使用多个loader的方式
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // 使用多个loader的方式  
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:5]'
              },
              importLoaders: 1,
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      // webpack5开始，静态资源统一由asset模块处理
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name].[hash:10][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024 // 80kb
          }
        }
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:10][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ReactRefreshPlugin(),
    // **/*表示会取output.path的目录
    // !取反，表示不会被删除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!不会被删除的文件.html']
    }),
    new HtmlWebpackPlugin({
      template: './src/public/ignoreResources/index.html'
    }),
    // ignore表示不会被复制的目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public',
          to: 'public',
          globOptions: {
            ignore: ["**/ignoreResources/**"],
          },
        }
      ]
    })
  ]
}