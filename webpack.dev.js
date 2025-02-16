const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Path to your main JavaScript file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
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
            // CSS loader for .css files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // SCSS loader for .scss files
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/frontend/views/index.html', // Path to your HTML template
            filename: 'index.html', // Output HTML file in dist folder
        }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all',
        historyApiFallback: true,
    }
};
