/**
 * @Author: Marte
 * @Date:   2019-06-14 21:38:42
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-06-15 09:37:11
 */
var fs = require('fs')

var Student = require('./student')

var express = require('express')

//1.创建路由容器
var router = express.Router()

//2.把路由都挂载到路由容器中
router.get('/students', function(req, res) {
    //把读取到的文件按照utf8编码。也可以用data.toString的方法
    /*    fs.readFile('./db.json', 'utf8', function(err, data) {
            if (err) {
                return res.status(500).send('Server error.')
            }
            //从文件中读取到的数据一定是字符串
            //这里一定要手动转成对象。
            var students = JSON.parse(data).students
            res.render('index.html', {
                fruits: [
                    '苹果',
                    '香蕉',
                    '桔子'
                ],
                //students: JSON.parse(data).students
                students: students
            })
        })*/

    Student.find(function(err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '桔子'
            ],
            //students: JSON.parse(data).students
            students: students
        })
    })
})

/**
 * 渲染添加学生页面
 */
router.get('/students/new', function(req, res) {
    res.render('new.html')
})

/**
 * 处理添加学生
 */
router.post('/students/new', function(req, res) {
    //1.获取表单数据
    //2.处理
    //3.发送响应
    //保存到文件
    Student.save(req.body, function(err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', function(req, res) {
    //1.在客户端列表页面中处理链接问题（需要有id参数）
    //2.获取要编辑的学生id
    //3.渲染编辑页面
    //  根据id把学生信息查出来
    //  使用模板引擎渲染页面
    Student.findById(parseInt(req.query.id), function(err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })



})

/**
 * 处理编辑学生
 */
router.post('/students/edit', function(req, res) {
    //1.获取表单数据
    //  req.body
    //2.更新
    //  Student.update()
    //3.发送响应
    Student.updateById(req.body, function(err) {
        if(err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})


router.get('/students/delete', function(req, res) {
    //1.获取要删除的id
    //2.根据id执行删除操作
    //3.根据操作结果发送响应数据
    Student.deleteById(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//3.导出router
module.exports = router


/*module.exports = function(app) {
    app.get('/students', function(req, res) {
        //把读取到的文件按照utf8编码。也可以用data.toString的方法
        fs.readFile('./db.json', 'utf8', function(err, data) {
            if (err) {
                return res.status(500).send('Server error.')
            }
            //从文件中读取到的数据一定是字符串
            //这里一定要手动转成对象。
            var students = JSON.parse(data).students
            res.render('index.html', {
                fruits: [
                    '苹果',
                    '香蕉',
                    '桔子'
                ],
                //students: JSON.parse(data).students
                students: students
            })
        })

    })

    app.get('/students/new', function(req, res) {
    })
    app.get('/students/new', function(req, res) {

    })
    app.get('/students/new', function(req, res) {

    })
    app.get('/students/new', function(req, res) {

    })
    app.get('/students/new', function(req, res) {

    })
} */