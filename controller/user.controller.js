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
          res.status(200).json(dataRes)
        }
        catch(err)
        {
            res.status(409).json(err)
        }
    }
}

module.exports = {
    createUser: createUser
}