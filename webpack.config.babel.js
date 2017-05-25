const {resolve} = require('path');

module.exports = env => ({
	context: resolve('src'),
	entry: "./index.js",
	output: {
		path: resolve('public'),
		filename: "bundle.js",
		publicPath: 'public/',
		pathinfo: !env.prod,
	},
	devtool: env.prod ?  "source-map" : 'eval',
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	}
});