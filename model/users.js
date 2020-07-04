var mongoose = require ('mongoose')
module.exports = mongoose.model("users",mongoose.Schema({
    username:String,
    password:String,
    role:Number,
    phone:String,
    email:String,
    create_time:Number
}))