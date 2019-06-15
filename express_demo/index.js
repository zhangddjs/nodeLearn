/*
* @Author: Marte
* @Date:   2019-06-11 10:07:41
* @Last Modified by:   Marte
* @Last Modified time: 2019-06-12 23:34:21
*/

//0安装
//1引包

var express = require("express");

//2创建服务器应用程序
//也就是原来的http.createServer();
var app = express()

//当服务器收到get请求/的时候，执行回调处理函数
app.get('/', function (req, res) {
    res.send('hello express');
})

//得到路劲
//一个一个判断
app.get('/about', function (req, res) {
    res.send('你好我是express');
})

//在Express中开放资源就是一个API的事
//公开指定目录，就可以直接通过/public/xx的方式访问public目录中的所有资源了
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))



app.listen(3000, function () {
    console.log('app is running at port 3000.');
})







