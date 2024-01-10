require("dotenv").config()
const jwt = require("jsonwebtoken")
const issServices = require("../services/iss.service")
const secretKey = process.env.SECRET_KEY

const createToken = (req,expiresIn)=>{
    const formData = req.body
    const endpoint = req.get('origin')
    const api = req.originalUrl;
    const iss = endpoint+api
    const token = jwt.sign({
        iss: iss,
        data: formData
    },secretKey,{expiresIn: expiresIn})
    return token
}

const verifyToken = (req)=>{
    const {token} = req.body
    try
    {
        if(!token) return {isVerified: false}
        const tmp = jwt.verify(token,secretKey)
        const requestComingFrom = tmp.iss
        if(issServices.indexOf(requestComingFrom) != -1){
            return {
                isVerified: true,
                data: tmp.data
            }
        }
        else
        {
            return {
                isVerified: false
            }
        }
        
    }
    catch(err)
    {
        return {
            isVerified: false
        }
    }
}

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken
}