const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const publicPath = '/dist/';

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    node: {
        fs: 'empty'
    },
    module: {
        rules: [ {
            test: /\.js?$/,
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            loader: "babel-loader",
            options: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.css?$/,
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]
        }, {
            test: /\.html?$/,
            use: [ {
                loader: "html-loader",
                options: { minimize: true }
            } ]
        }, {
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                context: this.rootContext
            }
        } ]
    },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, publicPath),
        filename: 'bundle.js'
    //  publicPath: publicPath,
    //  sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 4000,
        historyApiFallback: true,
        /*{
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html' }
            ]
        },*/
        noInfo: false,
        stats: 'minimal',
        // publicPath: publicPath,
        // contentBase: path.join(__dirname, "dist"),
        hot: true,
        compress: true
    }
};