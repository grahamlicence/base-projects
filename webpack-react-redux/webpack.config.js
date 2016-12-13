"use strict";
const webpack = require('webpack'),
    path = require('path'),
    chalk = require('chalk'),
    packageJSON = require('./package.json'),
    loaders = require('./webpack.loaders'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HOST = process.env.HOST || "127.0.0.1",
    PORT = process.env.PORT || "8000";

// global css
loaders.push({
	test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
	loaders: [
		'style?sourceMap',
		'css'
	]
});
// local scss modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.scss$/,
	// test: /(\.scss|\.css)$/,
	exclude: /(node_modules|bower_components|public)/,
	loaders: [
		'style?sourceMap',
		// 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
		'css?importLoaders=1',
        'sass-loader',
		'postcss',
		'sass'
	]
});

// local css modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.css/,
	exclude: /(node_modules|bower_components|public)/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
	]
});

module.exports = {
	entry: [
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		`webpack/hot/only-dev-server`,
		`./src/index.js` // Your appʼs entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: '/bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./src/sass")]
    },
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			title: 'Title'
		}),
	]
};
