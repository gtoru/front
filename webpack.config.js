const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
// todo: если всё же хочешь писать onclick в html, то отключи минимизацию бандла
// иначе все именованые функции превратятся в анонимные или в лучше случае названы одной буквой
    // optimization: {
    //     minimize: false
    // },

// todo: кажется нашел неплохую статью для нескольких html файлов в одном проекте
// https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/
// чтобы подключить используй html-webpack-plugin
// З.Ы. осторожней с вебпаком на раннем этапе, можно до суицида дойти
    plugins: [
        new ExtractTextPlugin('style.css')
        // new HtmlWebpackPlugin({
        //   template: './index.html',
        //   inject: true,
        //   filename: 'index.html'
        // })
      ]
};