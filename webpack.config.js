'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const MonacoEditorSrc = path.join(__dirname, 'src');

module.exports = {
    entry: {
        app: './web/src/index.jsx',
        vendor: [
            'react',
            'react-dom',
        ],
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader',
                ],
            },
            { test: /\.css$/, loaders: ['style', 'css']},

        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            'react-monaco-editor': MonacoEditorSrc
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'common.js'),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
        }),
        new webpack.SourceMapDevToolPlugin({
            exclude: /node_modules/,
        }),
        new CopyWebpackPlugin([
            {
                from: './node_modules/monaco-editor/min/vs',
                to: 'vs',
            }
        ]),
    ],
    devServer: {
        contentBase: './build',
        hot: true,
    },
}
