var path = require('path');
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
console.log(process.env.NODE_ENV);

module.exports = {
    entry: './src/index.js',
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000
    },
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
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css?$/,
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            use: {
                loader: "css-loader"
            }
        }, {
            test: /\.html?$/,
            use: [ {
                loader: "html-loader",
                options: { minimize: true }
            } ]
        } ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000
    }
};