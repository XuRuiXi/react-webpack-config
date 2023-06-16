const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 样式分离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  performance: {
    maxAssetSize: 1024 * 1024 // 1m 打包的asset资源，超过多少会提示
  },
  // 开启缓存，提升二次构建速度
  // cache: {
  //   type: 'filesystem', // 使用文件缓存
  // },
  resolve: {
    // 可以省略的后缀
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // 别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/, // 不处理的文件夹
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/, // 不处理的文件夹
        use: [
          'babel-loader', 
          'ts-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 取代style-loader实现样式分离
          MiniCssExtractPlugin.loader,
          // 'style-loader',
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
          // 'style-loader',
          MiniCssExtractPlugin.loader,
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
    // 添加 css 压缩配置
    new OptimizeCssAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/public/ignoreResources/index.html',
      publicPath: '/'
    }),
    // ignore表示不会被复制的目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public',
          to: 'public',
          noErrorOnMissing: true, // 当noErrorOnMissing设置为true时，如果源文件不存在，CopyWebpackPlugin不会抛出错误，而是跳过该文件的复制。
          globOptions: {
            ignore: ["**/ignoreResources/**"],
          },
        },
        {
          from: './src/public/ignoreResources/favicon.ico',
          to: '.',
        }
      ]
    })
  ]
};