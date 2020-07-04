var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs')
var path = require('path')

/* GET home page. */
router.post('/img', function(req, res) {
  var form = new multiparty.Form()
  form.parse(req, function(err, fields, files) {
    if(err) {
        res.json({err:1,msg:"图片上传失败"})
    }else {
        console.log(fields,"11111")
        console.log(files,"00000000")
        var img = files.file[0]
        var now = Date.now()
        // / 读取图片
        var readStream = fs.createReadStream(img.path)

        // // 写入图片到public里面 绝对路径
        var writeStream = fs.createWriteStream(path.join(__dirname,'../public/imgs/'+now+img.originalFilename))
        readStream.pipe(writeStream)
        // 监听文件读写完成时，将图片返回给前端
        writeStream.on('close', function(){
            res.json({err: 0, msg: 'succuess', data: {
              url: '/imgs/' + now + img.originalFilename
            }})
        })
    }
  });

});

module.exports = router;
