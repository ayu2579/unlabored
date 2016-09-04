const _ = require('lodash');
const path = require('path');
const argv = require('yargs').argv;
const colors = require('colors/safe');
const webpack = require('webpack');
const bourbon = require('node-bourbon').includePaths;

// Validations

const env = argv.env || 'development';
if (!_.includes(['production', 'development'], env)) {
  throw colors.red(`${env} is not available mode, it support production or development only.`);
}

const startMessage = `BUILD AS A ${_.toUpper(env)} MODE NOW`;
console.log(colors[_.isEqual(env, 'production') ? 'cyan' : 'yellow'].bold(startMessage));

// Config

module.exports = {
  devtool: _.isEqual(env, 'production') ? 'source-map' : '#module-eval-source-map',
  entry: './app/index.js',
	output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'app.js',
    publicPath: '/public/'
  },
	module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules)/, loaders: ['babel'] },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass?includePaths[]=' + bourbon]
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ].concat(
    _.isEqual(env, 'production') ?
      [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new webpack.optimize.DedupePlugin()
      ] : []
  )
};
