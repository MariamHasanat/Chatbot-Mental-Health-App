const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        index: './src/frontend/index.js',
        login: './src/frontend/login.js',
        chat: './src/frontend/chat.js',
        emergency: './src/frontend/emergency.js',
        articles: './src/frontend/articles.js',
        settings: './src/frontend/settings.js',
        signup: './src/frontend/signup.js',
        homePage: './src/frontend/home-page.js',
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
        new Dotenv(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 6060,
        allowedHosts: 'all'
    }
}