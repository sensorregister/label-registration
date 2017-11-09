var path = require('path');
var webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js',
        library: "Register",
        libraryTarget: "var"
    },
    plugins: [
        new ExtractTextPlugin("./src/main/resources/static/built/styles.css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ],
    node: {
        fs: "empty"
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['env', 'react']
            }},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};