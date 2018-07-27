const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || '/';

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
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: ASSET_PATH,
        //  sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.mode),
            'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000')
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
        publicPath: ASSET_PATH,
        // contentBase: path.join(__dirname, "dist"),
        hot: true,
        compress: true
    }
};