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
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
		loaders: [
			// { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
            // addition - add source-map support
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},
	node: {
		dns: 'empty',
		net: 'empty'
	}
});