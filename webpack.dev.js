const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let ip = require('ip');

module.exports = {
    mode: 'development',
    entry: {
        app: './production.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js?$|\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 9000,
        host: ip.address()
    },
    optimization: { // 使用可參考: https://juejin.im/post/5b99b9cd6fb9a05cff32007a
        splitChunks: {
            chunks: 'async',    // 'async', 'initial', 'all'
            minSize: 66666,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    // chunks: 'initial',
                },
                magaele: {
                    test: /magaele/,
                    name: 'magaele',
                    // chunks: 'async',
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './preview.html',
            filename: './preview.html',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'dayjs': 'dayjs',
        // 'Magaele': 'magaele'
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname)
        }
    }
};