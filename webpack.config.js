const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        filename: '[name].[contenthash].js',

        path: path.resolve(__dirname, 'build'),
    },
    module: {
        // rules: [{

        //     test: /\.(scss|css)$/,
        //     use: ['style-loader', 'css-loader', 'sass-loader']
        //     },{
        //         test: /\.(png|jpe?g|gif|svg)$/i,
        //         use: [
        //             {
        //                 loader: 'file-loader',
        //                 options : {
        //                     name: '[name].[ext]',
        //                     outputPath: 'images/'
        //                 }
        //             },
        //         ],
        //     }
        // ]
        rules: [{
            test: /\.(scss|css)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: (resourcePath, context) => {
                        return path.relative(path.dirname(resourcePath), context) + '/';
                    },
                },
            },
                'css-loader',
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                },
            ],
        },
        {
            test: /\.(doc|docx)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'info/'
                }
            },],
        },
        ]
    },
    // todo: если всё же хочешь писать onclick в html, то отключи минимизацию бандла
    // иначе все именованые функции превратятся в анонимные или в лучше случае названы одной буквой
    optimization: {
        moduleIds: 'hashed',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single',
    },

    // todo: кажется нашел неплохую статью для нескольких html файлов в одном проекте
    // https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/
    // чтобы подключить используй html-webpack-plugin
    // З.Ы. осторожней с вебпаком на раннем этапе, можно до суицида дойти
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            title: "Caching"
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
            chunks: ['app'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './registration.html',
            inject: true,
            chunks: ['app'],
            filename: 'registration.html'
        }),
        new HtmlWebpackPlugin({
            template: './example.html',
            inject: true,
            chunks: ['app'],
            filename: 'example.html'
        }),
        new HtmlWebpackPlugin({
            template: './testing.html',
            inject: true,
            chunks: ['app'],
            filename: 'testing.html'
        }),
        new HtmlWebpackPlugin({
            template: './information.html',
            inject: true,
            chunks: ['app'],
            filename: 'information.html'
        }),
        new HtmlWebpackPlugin({
            template: './question.html',
            inject: true,
            chunks: ['app'],
            filename: 'question.html'
        }),
        new HtmlWebpackPlugin({
            template: './test_page.html',
            inject: true,
            chunks: ['app'],
            filename: 'test_page.html'
        }),
    ]
};