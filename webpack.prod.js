const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.dev.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UglifyJsSetting = new UglifyJsPlugin({
    uglifyOptions: {
        cache: true,
        parallel: true,
        compress: {
            drop_console: true,
        },
        output: {
            comments: false,
            beautify: false,
        }
    }
});

const env = process.env.ENV;
const soucrePath = {
    // 本地測試環境
    'dev': '',
    // demo機環境
    'demo': '/Content/F2E/plugins/searchpanel/',
    // 測試機環境
    'rel': 'https://uwww.liontravel.com/_shared/plugins/searchpanel/',
    // 正式機環境
    'prod': 'https://www.liontravel.com/_shared/plugins/searchpanel/'
};

module.exports = Merge.smartStrategy({
    entry: 'replace'
})(CommonConfig, {
    mode: 'production',
    entry: {
        app: './production.js',
    },
    output: {
        filename: '[name].js',
        publicPath: soucrePath[env]
    },
    plugins: [
        UglifyJsSetting,
        new BundleAnalyzerPlugin()
    ]
});