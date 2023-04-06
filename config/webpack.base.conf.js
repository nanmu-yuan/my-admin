const path = require("path");
const webpack  = require('webpack');
const devMode = process.env.NODE_ENV === 'development'
const resolve  = dir =>path.resolve(process.cwd(),dir);//获取package.json当前下的执行路径 process.cwd()
module.exports  = {
    entry:{
        app:resolve("src/index.tsx")// 配置入口文件
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('public/index.html'),
            filename:'index.html',
            favicon:'public/favicon.ico',
            minify:{
                
            }
        })//html 模板插件
    ]
}