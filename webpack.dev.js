const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {

    entry: {
        index: './src/frontend/index.js',
        login: './src/frontend/login.js',
        signup: './src/frontend/signup.js',
        homePage: './src/frontend/home-page.js',
    },
    output: {
        publicPath: "/",
        libraryTarget: 'var',
        library: 'Client'

    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
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
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/home-page.html",
            filename: "./home-page.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/articles.html",
            filename: "./articles.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/chat.html",
            filename: "./chat.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/emergency.html",
            filename: "./emergency.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/settings.html",
            filename: "./settings.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
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
        allowedHosts: 'all',
        historyApiFallback: true,
    }
}