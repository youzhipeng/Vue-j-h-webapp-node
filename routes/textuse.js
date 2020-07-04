var express = require('express');
var router = express.Router();
var tetModel = require("../model/textuse");
/* GET home page. */
// 文本框添加
router.post('/tet', function(req, res) {
//   res.render('index', { title: 'Express' });
var {title,content} = req.body
var ele = {
    title,
    content
}
tetModel.insertMany([ele]).then((arr) =>{
    res.json({err:0,msg:"添加成功",data:arr})
})
});
// 文本框获取
router.get('/fid',function(req,res) {
    tetModel.find().then((arr2) =>{
        res.json({err:0,msg:"公告",data:arr2})
    })
})

module.exports = router;
