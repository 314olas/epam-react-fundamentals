const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
    ,
    plugins:[
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new CaseSensitivePathsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object'),
            'process.env.NODE_ENVir': JSON.stringify(process.env.NODE_ENV),
          }),
          new CheckerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        useCache: true,
                    }
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer"
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader", 
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.(svg|woff|jpg|png)$/,
                use: [ {
                    loader: "file-loader",
                    options: {
                        outputPath: "images",
                    }
                }]
            },
            {
                test: /\.(ttf|eot)$/,
                use: [ {
                    loader: "file-loader",
                    options: {
                        outputPath: "fonts",
                    }
                }]
            }
        ]
    }
}