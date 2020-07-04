var express = require('express');
var router = express.Router();
var userModel = require("../model/users")
var jwt = require("../utils/jwt")
// 用户注册
router.post('/regist', function(req, res, next) {
  var {username,password,role} =req.body
  if(!username) return res.json({err:1,msg:"请输入用户名"})
  if(!password) return res.json({err:1,msg:"请输入密码"})
  if(!/[a-zA-Z]{3,16}/.test(username)){
    return res.json({err:2,msg:"用户名要3-16位数的字母"})
  }
  if(!/^[a-zA-Z][a-zA-Z0-9\@\_\-]{5,17}$/.test(password)){
    return res.json({err:2,msg:"密码不符合5-17位数的字母数字组件"})
  }
  userModel.find({username}).then((arr) =>{
    if(arr && arr.length >0) {
      res.json({err:3,msg:"用户已存在"})
    }else {
      var ele = {
        username,
        password,
        role: role ? role: 1,
        create_time: Date.now()
      }
      userModel.insertMany([ele]).then(() =>{
        res.json({err:0,msg:"注册成功",data:{username}})
      })
    }
  })
});

//登入
router.post("/login",function(req,res) {
  var {username,password} =req.body
  if(!username) return res.json({err:1,msg:"请输入用户名"})
  if(!password) return res.json({err:1,msg:"用输入密码"})
  userModel.find({username,password}).then((arr) =>{
    if(arr && arr.length > 0 ){
      res.json({err:0,msg:"登入成功",data:{
        navs:[],
        role:1,
        username,
        avatar:'',
        token:jwt.createToken({username,password})
      }})
    } 
  })
})
module.exports = router;
