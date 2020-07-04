var express = require('express');
var router = express.Router();
var getModel = require("../model/good");
const carts = require('../model/carts');
const cartModel = require('../model/cate')
const swpModel = require('../model/swp') //轮播图
/* GET users listing. */

// 添加商品/修改商品，根据id判断修改还是新增
router.post('/add', function(req, res, next) {
    // name:String,//商品名称
    // desc:String, //商品描述
    // price:Number,//商品价格
    // cate:String,//品类
    // hot:Boolean, //是否推荐
    // img:String //图片
    console.log(req.body)
    var {name,desc,price,cate,hot,img,id} = req.body
    let ele = {
        name,
        desc,
        price,
        cate,
        hot,
        img
    }
    if(id){
        getModel.updateOne({_id:id},ele).then(() =>{
            res.json({err:0,msg:"修改成功"})
        })
    }else{
        getModel.insertMany([ele]).then(() =>{
            res.json({err:0,msg:"添加成功"})
        })  
    }
//   res.send('respond with a resource');
});

//删除商品
router.get('/del',function(req,res) {
    var {id} =req.query
    getModel.deleteOne({_id:id}).then(() =>{
        res.json({err:0,msg:"删除成功"})
    })
})

//详情商品
router.get('/datail',function(req,res) {
    var {good_id} = req.query
    getModel.find({_id:good_id}).then(arr =>{
        res.json({err:0,msg:"详情",data:arr})
    })
})

// 查询全部商品
router.get('/all',function(req,res) {
    var {page,pagesize,hot} = req.query
    page = parseInt(page ? page : 1)
    pagesize = parseInt(pagesize ? pagesize : 3)
    var params = {
        hot: hot ? hot : false
    }
    if(!params.hot) delete params.hot
    getModel.count(params).then(total =>{
        getModel.find(params).skip((page-1) * pagesize).limit(pagesize).then(arr=>{
            res.json({err:0,msg:"success",data:{
                total:total,
                list:arr
            }})
        })
    })
})

//查询品类
router.get('/cate',function(req,res,next) {
    cartModel.find({}).sort({rank:1}).then((arr) =>{
        res.json({err:0,msg:"sucee",data:arr})
    })
})
// 新增品类
//品类
router.post('/pocate',function(req,res,next) {
    var {cate,cate_zh} = req.body
    let ele = {
        cate,
        cate_zh
    }
    cartModel.insertMany([ele]).then((arr) =>{
        res.json({err:0,msg:"sucee",data:arr})
    })
})

// 添加轮播图数据
router.post('/swp',function(req,res,next) {
    var {title,img,id} =req.body
    let ele = {
        title,
        img
    }
    if(id){
        swpModel.updateOne({_id:id},ele).then((arr1) =>{
            res.json({err:0,msg:"更改成功",data:arr1})
        })
    }else{
        swpModel.insertMany([ele]).then((arr) =>{
            res.json({err:0,msg:"添加成功",data:arr})
        })
    }
})
//查询所有轮播图
router.get('/swpall',function(req,res,next) {
   swpModel.find({}).then((arr3)=>{
    res.json({err:0,msg:"查询成功",data:arr3})
   })
})
//删除轮播图
router.get("/swpdel",function(req,res,next) {
    var {id} = req.query
    swpModel.deleteOne({_id:id}).then(() =>{
        res.json({err:0,mag:"删除成功"})
    })
})
module.exports = router;
