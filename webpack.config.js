const {resolve} = require('path');
const webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = env => ({
	context: resolve('src'),
	entry: "./index.tsx",
	output: {
		path: resolve('public'),
		filename: "bundle.js",
		publicPath: 'public/',
	},
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env.dev)
            },
        }),
        new webpack.optimize.UglifyJsPlugin(),
		new DotenvPlugin({
			sample: './.env.hide',
			path: './.env',
			safe: true
		})
    ],
    module: {
		loaders: [
            { test: /\.([tj])sx?$/, exclude: /node_modules/, use: { loader: 'awesome-typescript-loader' } },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
		]
	},
	node: {
		dns: 'empty',
		net: 'empty',
		fs:'empty'
	}
});