require("dotenv").config()
const jwt = require("jsonwebtoken")

const createToken = (req,expiresIn)=>{
    const token = jwt.sign(req.body,process.env.SECRET_KEY,{expiresIn})
    return token
}

const verifyToken = (data)=>{
    const resData = jwt.verify(data,process.env.SECRET_KEY)
    if(data) return {
        isVerified: true,
        data: resData
    }
    return {
        isVerified: false
    }
}

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken
}