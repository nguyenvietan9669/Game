var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ConstantPlugin = require('constant-plugin');

module.exports =
{
    entry:
    [
        'babel-polyfill',
        './js/core/Main.js',
    ],
    output:
    {
        path: __dirname + '/.release',
        filename: './js/main.js',
        publicPath: '/'
    },
    module:
    {
        loaders:
        [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:
                {
                    presets: ['es2015', 'es2015-node5', 'stage-0'],
                    plugins: []
                }
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{ loader: ConstantPlugin.loader() }]
			},
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins:
    [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
        {
            template: 'index.html',
            inject: 'body',
        }),
        new webpack.DefinePlugin(
        {
          'ADS_TYPE': JSON.stringify(process.env.ADS_TYPE),
          'USE_OVERRIDE': true,
        }),
        new ConstantPlugin('.build_CORE/DataHeader')
    ],
    resolveLoader:
    {
        modules: [path.join(process.env.NODEJS, 'node_modules'),process.env.NODE_PATH,path.resolve('./node_modules')],
    },
    resolve:
    {
        modules: [path.join(process.env.NODEJS, 'node_modules'),process.env.NODE_PATH,path.resolve('./node_modules')],
    }
}