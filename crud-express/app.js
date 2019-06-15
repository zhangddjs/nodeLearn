/*
* @Author: Marte
* @Date:   2019-06-13 23:16:18
* @Last Modified by:   Marte
* @Last Modified time: 2019-06-15 10:48:10
*/

var express = require('express')
var fs = require('fs')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//把路由容器挂载到app服务中
app.use(router)


app.listen(3000, function () {
    console.log('running 3000...');
})

module.exports = app
