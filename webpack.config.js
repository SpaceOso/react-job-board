const {resolve} = require('path');
module.exports = env => ({
	context: resolve('src'),
	entry: "./index.tsx",
	output: {
		path: resolve('public'),
		filename: "bundle.js",
		publicPath: 'public/',
		pathinfo: !env.prod,
	},
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
		loaders: [
            { test: /\.([tj])sx?$/, exclude: /node_modules/, use: { loader: 'awesome-typescript-loader' } },
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