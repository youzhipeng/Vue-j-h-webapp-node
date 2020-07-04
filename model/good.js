var mongoose=require("mongoose")

module.exports = mongoose.model('goods',mongoose.Schema({
    name:String,//商品名称
    desc:String, //商品描述
    price:Number,//商品价格
    cate:String,//品类
    hot:Boolean, //是否推荐
    img:String //图片
}))