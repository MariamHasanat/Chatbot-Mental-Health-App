const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        splash: './src/frontend/views/splash.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: 'source-map', // For easier debugging in development
    module: {
        rules: [
            // Babel loader for JS (ES6+ to ES5)
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/frontend/views/splash.html',
            filename: 'splash.html',
            chunks: ['splash'],
        }),
        new HtmlWebpackPlugin({
            template: './src/frontend/views/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }), 
    ],
    devServer: {
        port: 6060,
        allowedHosts: 'all',
        historyApiFallback: {
            index: '/splash.html'
        },
    }
};