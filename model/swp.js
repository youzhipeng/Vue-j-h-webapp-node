var mongoose = require("mongoose")

module.exports = mongoose.model("swpiers",mongoose.Schema({
    title:String,//标题
    img:String//内容
}))