const {resolve} = require('path');
const webpack = require('webpack');

module.exports = env => ({
// module.exports = {
	context: resolve('src'),
	entry: "./index.tsx",
	output: {
		path: resolve('public'),
		filename: "bundle.js",
		publicPath: 'public/',
		// pathinfo: !env.prod,
	},
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            },
        })
    ],
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
// };
});