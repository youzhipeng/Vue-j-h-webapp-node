var jwt = require('jsonwebtoken')

// 生成token
function createToken(data) {
    return jwt.sign({
        exp:Math.floor(Date.now() / 1000) + (60*60*24),//失效时间
        data:data
    },"MY_GOOD")
}

// 验证token
function verifyToken(token) {
    // console.log('token',decoded)
    return new Promise(function(reslove,reject) {
        try {
            var decoded = jwt.verify(token,"MY_GOOD");
            reslove(decoded.data)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    createToken,
    verifyToken
}