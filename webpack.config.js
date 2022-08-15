const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
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
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
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