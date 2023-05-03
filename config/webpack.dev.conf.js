const {merge} = require("webpack-merge");
const path = require("path");
const webpack = require('webpack');
const resolve = dir => path.resolve(process.cwd(),dir);
const baseConf = require('./webpack.base.conf')
module.exports = merge(baseConf,{
    mode:'development',
    devtool:'cheap-module-source-map',//启动 source- map 的模式，如果代码发生错误则在浏览器上映射到对应错误地方
    output:{
        filename:'js/[name].js',
        path:resolve('./dist'),
        publicPath:'/'
    },
    devServer:{
        static:"./dist",
        host:'127.0.0.1',
        port:'8888',
        compress:true,
        open:true,
        hot:true,
        historyApiFallback:true
   
    },
    plugins:[
        new  webpack.HotModuleReplacementPlugin()
    ]

})