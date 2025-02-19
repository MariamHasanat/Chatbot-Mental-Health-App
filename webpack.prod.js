const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: './src/frontend/index.js',
        login: './src/frontend/login.js',
        signup: './src/frontend/signup.js',
    },
    mode: 'production',
    output: {
        publicPath: "/",
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            }, {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/index.html",
            filename: "./index.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/login.html",
            filename: "./login.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/signup.html",
            filename: "./signup.html",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/frontend/views/header.html", to: "header.html" },
                { from: "./src/frontend/js/theme.js", to: "js/theme.js" },
                { from: "./src/frontend/assets/", to: "assets/" },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 6060,
        allowedHosts: 'all'
    }
}