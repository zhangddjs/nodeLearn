/*
 * @Author: Marte
 * @Date:   2019-06-15 07:24:35
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-06-15 09:40:44
 * 数据操作文件模块，只处理数据不关心业务
 */

var fs = require('fs')
var dbPath = './db.json'
    /**
     * 获取所有学生列表
     * callback 中的参数
     *     第一个参数是err
     *         成功是 null
     *         错误是 错误对象
     *     第二个参数是结果
     *         成功是 数组
     *         错误是 undefined
     * return []
     */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        // JSON.parse(data).students
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 根据id获取学生对象
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        // JSON.parse(data).students
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var student = students.find(function(item) {
            return item.id === parseInt(id)
        })
        callback(null, student)
    })
}

/**
 * 添加保存学生
 */
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //处理id唯一
        if(students.length != 0) {
            student.id = students[students.length - 1].id + 1
        } else {
            student.id = 1
        }
        //保存到数组中
        students.push(student)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 更新学生
 */
exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        //注意：这里记得把id统一转为数字类型
        student.id = parseInt(student.id)
        //EcmaScript 6中的一个方法：find，需要接收一个函数作为参数
        var stu = students.find(function(item) {
            return item.id === student.id
        })
        //遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除学生
 */
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        //findIndex方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function(item) {
            return item.id === parseInt(id)
        })

        //根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}