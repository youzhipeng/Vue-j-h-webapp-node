var mongoose = require('mongoose')

var url = "mongodb://localhost:27017/webapp"

mongoose
.connect(url)
.then(() =>{
    console.log("连接成功")
})
.catch((err) =>{
    console.log("连接失败",err)
})
module.exports = mongoose