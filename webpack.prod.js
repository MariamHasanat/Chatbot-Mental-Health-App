const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/frontend/index.js',
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
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', 
                generator: {
                    filename: 'assets/[name][ext]', 
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        new HtmlWebPackPlugin({  
            template: "./src/frontend/views/chat.html",
            filename: "chat.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/frontend/views/settings.html", 
            filename: "settings.html",
        }),
        new CopyPlugin({
            patterns: [
              { from: "./src/frontend/views/header.html", to: "header.html" }, 
              { from: "./src/frontend/js/theme.js", to: "js/theme.js" },
              { from: "./src/frontend/assets/", to: "assets/" },
              { from: "./src/frontend/js/chatbot.js", to: "js/chatbot.js" },
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