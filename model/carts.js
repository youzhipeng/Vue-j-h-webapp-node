var mongoose = require ('mongoose')

module.exports = mongoose.model("carts",mongoose.Schema({
    create_time:Number, //创建时间
    order_id:String,//
    good_id:String, //商品id
    user_id:String //用户名id
}))