const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const env = process.env.NODE_ENV;
let config = '';

if (env === 'production') {
  config = require('./prod.config');
} else if (env === 'development') {
  config = require('./dev.config');
}

module.exports = merge(baseConfig, config);
module.exports = smp.wrap(merge(baseConfig, config));
