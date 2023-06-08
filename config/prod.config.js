const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: false, // false source-map eval eval-cheap-module-source-map
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    // publicPath: '',
    // name表示文件名，ext表示文件扩展名
    assetModuleFilename: 'resources/[name].[hash:5][ext]'
  },
  // optimization: {
  //   // 代码分割
  //   splitChunks: {
  //     chunks: 'all',
  //   }
  // },
  plugins: [
    // **/*表示会取output.path的目录
    // !取反，表示不会被删除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!不会被删除的文件.html']
    }),
  ]
};