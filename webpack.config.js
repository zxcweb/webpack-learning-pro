const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = reqiure('webpack');
module.exports = {
    mode:'production',
    // 多入口
    entry:{
        home:'./src/index.js',
        other:'./src/other.js'
    },
    plugins:[
        // 这里new两次代表输出两个html模板
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'other.html',
            chunks:['other']
        }),
        new webpack.DefinePlugin({
            // 定义了一个全局的变量DEV，值为字符串"production"
            DEV:JSON.stringify("production")
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer:{
        proxy:{
            //以/api开头的请求会代理到http://localhost:3000
            // '/api':'http://localhost:3000'
            
        }
    },
    /**1
     * 源码的映射，会单独生成一个sourcemap文件 出错了会标识当前错误位置
     */
    // devtool:'source-map',
    /**2
     * 源码的映射，不会单独生成一个sourcemap文件，出错了会标识当前错误位置
     */
    // devtool:'eval-source-map',
    /**3
     * 不会产生列，但是是个单独的映射文件
     */
    // devtool:'cheap-module-source-map',
    /**4
     * 不会差生列，集成在打包文件中，不会生成单独的映射文件
     */
    devtool:'cheap-module-eval-source-map',
    resolve:{//解析 第三方包
        //查找路径
        modules:[path.resolve('node_modules')],
        alias:{ // 路径别名
            '@':'./src/'
        }
    },
    output:{
        // [name]会匹配entry的name来输出多个文件出口
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}