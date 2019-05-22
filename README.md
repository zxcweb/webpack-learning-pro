# webpack进阶
如果您是新手，请转到
[webpack基础篇](https://github.com/zxcweb/webpack-learning)

## 打造多页应用
  - 初始化并安装webpack<br>
    npm init<br>
    npm install webpack webpack-cli -D<br>
    npm install html-webpack-plugin -D<br>
  - 建立webpack配置文件<br>
    根目录下建立webpack.config.js文件<br>
    执行npx webpack即可打包<br>
    src目录如下<br>
    |-src<br>
        -index.js<br>
        -other.js<br>
    webpack.config.js配置如下

    ```js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    module.exports = {
        mode:'development',
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
            })
        ],
        output:{
            // [name]会匹配entry的name来输出多个文件出口
            filename:'[name].js',
            path:path.resolve(__dirname,'dist')
        }
    }
    ```

## 配置source-map
  - 安装配置webpack-dev-server
  - wcj下添加配置devtool，他有四种类型,分别看一下<br>

    ```js
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
    ```




## 几个小插件
  - cleanWebpackPlugin<br>
    每次新生成xx目录，删除原有xx目录
  - copyWebpackPlugin<br>
    拷贝文件到xx
  - bannerPlugin 内置
    版权声明插件，打包文件头部添加声明

## webpack配置跨域问题
  - 在webpack.config.js中配置
    ```js
    devServer:{
        proxy:{
            //以/api开头的请求会代理到http://localhost:3000
            // '/api':'http://localhost:3000'
            
        }
    }
    ```
  - 如果在前端想mock数据<br>
    ```js
    devServer:{
        before(app){
            app.get('user',(req,res)=>{
                res.json({
                    name:'zxc'
                })
            })
        }
    }
    ```

## webpack resolve配置
  - webpack.config.js
    ```js
    resolve:{//解析 第三方包
        //查找路径
        modules:[path.resolve('node_modules')],
        alias:{ // 路径别名
            '@':'./src/'
        }
    },
    ```

## 配置环境变量
  - webpack内置插件
    ```js
    new webpack.DefinePlugin({
        // 定义了一个全局的变量DEV，值为字符串"production"
        DEV:JSON.stringify("production")
    })
    ```

## 区分开发环境和生产环境
  - 我们需要建三个配置文件<br>
    webpack.base.js // 用于webpack公共的配置<br>
    webpack.dev.js // 用于专门配置开发环境的配置<br>
    webpack.prod.js // 用于专门配置生产环境的配置<br>
  - 安装npm install webpack-merge -D
  - wpj配置
    ```js
    const {smart} = require('webpack-merge');
    let base = require("./webpack.base.js");

    module.exports = smart(base,{
        mode:'production',
        //...
    })
    ```
  - wdj配置
    ```js
    const {smart} = require('webpack-merge');
    let base = require("./webpack.base.js");

    module.exports = smart(base,{
        mode:'development',
        //...
    })
    ```
  - 运行时单独运行wdj或者wpj即可
    
