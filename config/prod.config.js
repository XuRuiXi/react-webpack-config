const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 打包结果分析插件
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  devtool: false, // false source-map eval eval-cheap-module-source-map
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    // publicPath: '',
    // name表示文件名，ext表示文件扩展名
    assetModuleFilename: "resources/[name].[hash:5][ext]",
  },
  // 代码分割
  optimization: {
    splitChunks: {
      /*
        有效值为 `all`，`async` 和 `initial`
        三种值的区别：
        all: 所有引入的库都会进行代码分割
        async: 异步引入的库进行代码分割，（默认）
        initial: 同步引入的库进行代码分割
        */
      chunks: "all",
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      // generateStatsFile: true, // 是否生成stats.json文件
    }),
    // **/*表示会取output.path的目录
    // !取反，表示不会被删除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!不会被删除的文件.html"],
    }),
  ],
};
