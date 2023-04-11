const {merge} = require('webpack-merge');
const path=require('path');
const baseConf = require('./webpack.base.conf');
const  resolve = dir =>path.resolve(process.cwd(),dir);
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const  CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge(baseConf,{
    mode:'production',
    devtool:false,
    output:{
        filename:'js/[name].[contenthash:8].js',
        assetModuleFilename:'images/[name].[contenthash:8].[ext]',
        path:resolve('./dist'),
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].[contenthash:8].css',
            chunkFilename:'css/[name].[contenthash:8].chunk.css'
        })
    ],
    optimization:{//在 webpack4 之后添加了 optimization 属性，专门用于存放优化打包的配置，minimizer属性存放一个数组，里可以存放用于代码压缩的插件，minimize 置 true 表示启用 minimizer 配置
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
//extractComments：设为 false 表示去除所有注释，除了有特殊标志的注释如 @preserve 标记
//pure_funcs：去除函数，如上述配置的意思是将所有 console.log 函数去除
                terserOptions: {
                  compress: { pure_funcs: ['console.log'] }
                }
              })
        ]
    }
})
/**
 * 哈希值的区别：

hash：每次修改任何一个文件，所有文件名的hash至都将改变，所以一旦修改了任何一个文件，整个项目的文件缓存都将失效

chunkHash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样，chunkHash不适用于同一chunk的文件，
如一个js文件导入了一个css文件，他们属于同一个chunk，因此若只修改了js，最终打包出来的文件cs和js都会变成一个新的hash

contenthash：根据文件内容生成hash值，不同文件的hash值一定不一样（只要文件内容不做修改，一定是同一个hash，有变动则会替换成另外的）
，这样就令浏览器只清楚掉变动文件的缓存（只有改动的文件重命名了）
 */