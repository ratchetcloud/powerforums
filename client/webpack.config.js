const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        filename: '[name].bundle.js',
        chunkFilename: 'js/[chunkhash].js',
        publicPath: '/',
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
        new CopyWebpackPlugin([
            { from: path.join(__dirname, '/assets'), to: 'assets' }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 4000,
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: '/',
        hot: true,
        // compress: true
    }
};