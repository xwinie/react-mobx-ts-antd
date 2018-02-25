var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
var APP_PATH = path.resolve(__dirname, 'app');
var SRC_PATH = path.resolve(__dirname, 'src');

let url = "http://127.0.0.1:9001";
let options = {
    target: url,
    changeOrigin: true,
    ws: true
};

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],//优化webpack文件搜索范围
        extensions: ['', '.js', '.jsx','.ts','.tsx'],
        unsafeCache: true,
        alias: {
            'components': path.resolve(__dirname, './src/components'),
            'view': path.resolve(__dirname, './src/view'),
            'res': path.resolve(__dirname, './src/res'),
            'model': path.resolve(__dirname, './src/model'),
            'utils': path.resolve(__dirname, './src/utils')
        }
    },
    entry: ['./src/App.tsx'],
    output: {
        path: path.resolve(__dirname, 'app'),
        // publicPath:'./',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({libraryName: "antd", style: "css"})]
                    })
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {   test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    name: 'res/img/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|woff|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    name: 'res/font/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            __module: path.join(__dirname, 'src', 'module'),
            __public: path.join(__dirname, 'src', 'public'),
            __res: path.join(__dirname, 'src', 'res'),
            __config: path.join(__dirname, 'src', 'config'),
            __utils: path.join(__dirname, 'src', 'utils')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    // // devtool:'source-map',
    devServer: {
        contentBase: './dist',
        port: 8777,
        inline: true,
        open: true,
        openPage: '',
        proxy: {'/api/*': options}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

