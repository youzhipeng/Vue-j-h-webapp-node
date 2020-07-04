var express = require('express');
var router = express.Router();
var cartModel = require('../model/carts')
var goodModel = require("../model/good")
var userModel = require("../model/users")
var jwt = require('../utils/jwt');
const carts = require('../model/carts');
const { use } = require('.');

// 添加购物车、用户鉴权
router.get('/add',function(req,res,next) {
    var {good_id} = req.query
    if(!good_id) return res.json({err:1,msg:"good_id是必需传的"})
    // 判断商品是否存在
    goodModel.find({_id:good_id}).then((arr) =>{
        if(arr && arr.length > 0) {
            // 判断是否登入
            var token = req.headers.authorization
            if(!token) return res.json({err:-1,msg:"token无效，请重新登入"})
            //用户鉴权
            jwt.verifyToken(token).then((user) =>{  
                // console.log(user)
                // res.json({err:0,user:user})
                // 根据用户信息查询用户
                userModel.find(user).then(arr=>{
                    // console.log(arr)
                    // res.json({err:0,arr:arr})
                    var user_id= arr[0]._id
                    var ele = {
                        good_id,
                        user_id,
                        create_time:Date.now(),
                        order_id:'QF'+Date.now()
                    }
                    cartModel.insertMany([ele]).then(() =>{
                        res.json({err:0,msg:"添加个购物车成功",data:ele})
                    })
                })
            })
            .catch(() =>{
                res.json({err:-1,msg:"token无效",msg:"请重新登入"})
            })
        }
    }).catch(() =>{
        res.json({err:0,msg:"当前商品不存在，无法购买"})
    })
})
// 查询全部数据
router.get("/list",function(req,res) {
    var token = req.headers.authorization
    jwt.verifyToken(token).then(user=>{
        userModel.find(user).then(arr=>{
            var user_id = arr[0]._id
            cartModel.find({user_id}).then(arr2=>{
                // console.log(arr2,"--------------------------")
                    let list = []
                    // ?遍历获取商品信息，一起传递给购物车列表
                arr2.map((ele,idx)=>{
                goodModel.find({_id: ele.good_id}).then(arr3=>{
                    list.push({
                    _id: ele._id,
                    good_id: ele.good_id,
                    create_time: ele.create_time,
                    user_id: ele.user_id,
                    num: ele.num,
                    status: ele.status,
                    good: arr3[0]
                    })
                    if (list.length == arr2.length) {
                    res.json({err:0,msg:'success',data:list})
                    }
                })
                })
    //         for(var i = 0;i < arr2.length;i++) {
    //     // var id = arr[i].good_id
    //     var _id = arr2[i]._id
    //     console.log(_id)
    //     goodModel.find({_id:arr2[i].good_id}).then(item=>{
    //         list.push({
    //             id:_id,
    //             good:item[0]
    //         })
    //         if(list.length == arr2.length){
    //         res.json({err:0,data:list,msg:"success"})
    //         // console.log(list.data)
    //         }
    //     })
    // }
        // 遍历获取商品信息，一起传递给购物车列表
        // arr.map((ele,idx)=>{
        //   goodModel.find({_id: ele.good_id}).then(arr2=>{
        //     list.push({
        //       _id: ele._id,
        //       good_id: ele.good_id,
        //       create_time: ele.create_time,
        //       user_id: ele.user_id,
        //       num: ele.num,
        //       status: ele.status,
        //       good: arr2[0]
        //     })
        //     if (list.length == arr.length) {
        //       res.json({err:0,msg:'success',data:list})
        //     }
        //   })
        // })
            })
        })
    })
})

//删除购物车

router.get('/deleteToCart',function(req,res) {
    var {id} =req.query
    // console.length(id)
    cartModel.deleteOne({_id:id}).then(arr =>{
        // if(!arr)
        res.json({err:0,msg:"删除成功"})
    })
})
module.exports = router;
    