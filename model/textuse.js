var mongoose = require("mongoose")

module.exports = mongoose.model("texts",mongoose.Schema({
    title:String,//标题
    content:String//内容
}))