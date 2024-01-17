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

const getUserByQuery = async (req,res)=>{
    const token = tokenServices.verifyToken(req)
    if(token.isVerified)
    {
        const query = {
            uid: token.data.uid
        }
        const userRes = await User.find(query)
        if(userRes)
        {
            res.status(200).json({
                isUserExist: true,
                message: "User found",
                data: userRes
            })
        }
        else{
            res.status(404).json({
                isUserExist: false,
                message: "User not found"
            })  
        }
    }
    else
    {
        res.status(401).json({
            message: "Permission denied"
        })
    }
}

module.exports = {
    createUser: createUser,
    getUserByQuery: getUserByQuery
}