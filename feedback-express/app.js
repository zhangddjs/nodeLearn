/*
* @Author: Marte
* @Date:   2019-06-13 20:53:14
* @Last Modified by:   Marte
* @Last Modified time: 2019-06-13 23:09:16
*/

var express = require('express')
var bodyParser = require('body-parser')
var app = express();

app.use('/public/', express.static('./public/'))

//配置使用art-template
//第一个参数表示当渲染以.art结尾的文件的时候，使用art-template
//express-art-template是专门用在express中把art-template整合到express中
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//express 为response提供了一个方法：render
//render方法默认不能使用，当配置了模板引擎就可以了。
//response.render('html模板名',{模板数据})
//默认第一个参数不能写路径，默认去项目中views目录查找模板文件

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

app.get('', function (req, res) {
    res.render('index.html', {
        comments: comments
    })
})

app.get('/admin', function (req, res){
    res.render('admin/index.html', {
        title:'管理系统'
    })
})

app.get('/post', function (req, res) {
    res.render('post.html')
})

/*app.get('/pinglun', function (req, res) {
    var comment = req.query
    comment.dateTime = '2019-06-13 21:59:59'
    comments.unshift(comment)
    // res.statusCode = 302
    // res.setHealder('Location', '/')
    res.redirect('/')
})*/

app.post('/post', function (req, res) {
    //1.获取表单POST请求体数据
    //2.处理
    //3.发送响应
    var comment = req.body
    comment.dateTime = '2019-06-13 21:59:59'
    comments.unshift(comment)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('running...')
})