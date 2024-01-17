const express = require("express")
const router = express.Router()
const tokenServices = require("../services/token.service")
const httpService = require("../services/http.service")
const bcryptService = require("../services/bcrypt.service")

router.post("/", async (req,res)=>{
    const expiresIn = 120
    const token = tokenServices.createToken(req,expiresIn)
    const companyRes = await httpService.getRequest({
        token: token,
        api: "/api/private/company",
        endpoint: req.get("origin")
    })

    if(companyRes.body.isCompanyExist){
        const query = {
            body: {
                uid: companyRes.body.data[0]._id
            }
        }
        const token = tokenServices.createCustomToken(req,query,expiresIn)
        const userRes = await httpService.getRequest({
            token: token,
            api: "/api/private/user",
            endpoint: req.get('origin')
        })
        const hashPassword = userRes.body.data[0].password
        if(userRes.body.isUserExist){
           const isLogged = await bcryptService.decrypt(hashPassword,req.body.password)
            if(isLogged){
                const query = {
                    body: {
                        uid: companyRes.body.data[0]._id
                    }
                }
                const secondsInSevenDays = 604800
                const token = tokenServices.createCustomToken(req,query,secondsInSevenDays)
                res.cookie("authToken",token)
                res.status(200).json({
                    isLogged: true,
                    message: "Success"
                })
            }
            else
            {
                res.status(401).json({
                    message: "wrong password"
                })
            }
        }
        else
        {
            res.status(404).json({
                message: "user not fond"
            })  
        }
    }
    else{
        res.status(404).json({
            message: "Company not fond"
        })
    }
    
})

module.exports = router