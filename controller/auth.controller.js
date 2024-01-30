const tokenServices = require("../services/token.service")
const User = require("../model/user.model")

const checkUserLog = async (req)=>{
    const token = tokenServices.verifyToken(req)
    if(token.isVerified)
    {
        const query = {
            uid: token.data.uid,
            token: req.cookies.authToken,
            isLogged: true
        }

       const data =  await User.find(query)
       if(data.length) return true
       return false
    }
    else{
        return false
    }
}

module.exports = {
    checkUserLog: checkUserLog
}