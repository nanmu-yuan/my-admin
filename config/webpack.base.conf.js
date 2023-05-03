const path = require("path");
const webpack = require('webpack');
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");//打包进进度条
const CopyWebPlugin = require('copy-webpack-plugin');

const resolve = dir => path.resolve(process.cwd(), dir);//获取package.json当前下的执行路径 process.cwd()
// 
const getCssLoaders = () => {
    const cssLoader = [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: "[local]__[hash:base64:5]",//设置class 名称hash化;[文件名称]__[类名称]__[五位的hash值]
                },
                sourceMap: isDevelopment,
                importLoaders: 2
            }
        }
    ];
    isProduction && cssLoader.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    isProduction && [
                        'postcss-preset-env', {  //开启自动添加前缀功能，有些功能是默认关闭的，如栅格样式一些浏览器不支持所以默认关闭了，这里手动打开
                            autoprefixer: {
                                gird: true
                            }
                        }
                    ]
                ]
            }
        }
    })
    return cssLoader
}


module.exports = {
    entry: {
        app: resolve("src/index.tsx")// 配置入口文件
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('public/index.html'),
            filename: 'index.html',
            favicon: 'public/favicon.ico',
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),//html 模板插件
        new WebpackBar({
            name: "link start",
            color: "#52c41a"
        }),
        new CleanWebpackPlugin(),
        new CopyWebPlugin({// 复制插件
            patterns:[
                {
                    context:'public',
                    from:'*',
                    to:resolve('./dist/public'),
                    toType:'dir',
                    globOptions:{
                        dot:true,
                        gitignore:true,
                        ignore:['**/index.html']
                    }
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: [/\.png$/, /\.jpe?g$/, /\.bmp$/, /\.gif$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    }
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: [...getCssLoaders()]
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDevelopment,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },//在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，所以开启该配置将这些公共文件缓存起来，下次编译就会加快很多
                exclude: /node_modules/,//第三方包不需要进行转译，排除后可加快打包速度
            }

        ]
    },

    resolve: {
        alias: {
            '@': resolve('src'),
        },
        extensions: ['.tsx', '.ts', '.js', '.json'],
    }
}
console.log(module)