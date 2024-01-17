require("../modules/db.modules")
const User = require("../model/user.model")
const tokenServices = require("../services/token.service")

const createUser = async (req,res)=>{
    const {data, isVerified} = tokenServices.verifyToken(req)
    if(isVerified)
    {
        try
        {
          const user = new User(data)
          const dataRes = await user.save()
          res.status(200).json({
            isUserCreated: true,
            message: "User created",
            data: dataRes
        })
        }
        catch(err)
        {
            res.status(409).json({
                isUserCreated: false,
                message: "User not created"
            })
        }
    }
}

const getUser = (req,res)=>{
    console.log(req.text)
    res.status(200).json({
        message: "user gets"
    })
}

module.exports = {
    createUser: createUser,
    getUser: getUser
}