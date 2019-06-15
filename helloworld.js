/*
* @Author: zdd
* @Date:   2019-06-05 14:13:14
* @Last Modified by:   Marte
* @Last Modified time: 2019-06-05 14:29:19
*/

var http = require('http');
http.createServer(function (request, response) {

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');




