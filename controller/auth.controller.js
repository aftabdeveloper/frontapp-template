const tokenServices = require("../services/token.service")
const User = require("../model/user.model")
const { response } = require("../app")

const refreshToken = async (uid,req)=>{
    const options = {
        body: uid
    }
    const expiresIn = 86400
    const newToken = tokenServices.createCustomToken(req,options,expiresIn)
    const updateMe = {
        token: newToken,
        expiresIn: expiresIn,
        updatedAt: Date.now()
    }
    await User.updateOne(uid,updateMe)
    return newToken
}

const checkUserLog = async (req,res)=>{
    const tokenData = tokenServices.verifyToken(req)
    if(tokenData.isVerified)
    {
        const query = {
            uid: tokenData.data.uid,
            token: req.cookies.authToken,
            isLogged: true
        }

       const userData =  await User.find(query)
       if(userData.length) {
        const newToken = await refreshToken(tokenData.data,req)
        res.cookie("authToken",newToken,{maxAge:(86400*1000)})
        return true
       }
       return false
    }
    else{
        return false
    }
}

const logout = async (req,res)=>{
    const tokenData = tokenServices.verifyToken(req)
    if(tokenData.isVerified)
    {
        const query = {
            token:req.cookies.authToken
        }
        const updateMe = {
            isLogged: false,
            updatedAt: Date.now()
        }
        const userRes = await User.updateOne(query,updateMe)
        if(userRes.nModified)
        {
            res.clearCookie("authToken")
            res.redirect("/")
        }
        else
        {
            res.redirect("/profile")
        }
    }
    else
    {
        res.status(401).json({
            message:"Permission denied"
        })
    }
}

module.exports = {
    checkUserLog: checkUserLog,
    logout: logout
}