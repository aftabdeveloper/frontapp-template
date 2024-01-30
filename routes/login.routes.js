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
        const passRes = await httpService.getRequest({
            token: token,
            api: "/api/private/user",
            endpoint: req.get('origin')
        })
        //    // single device login
        //    if(passRes.body.data[0].isLogged){
        //     res.status(406).json({
        //         message: "Please logout from other device"
        //     })
        //     return false
        // }
        const hashPassword = passRes.body.data[0].password
        if(passRes.body.isUserExist){
           const isLogged = await bcryptService.decrypt(hashPassword,req.body.password)
            if(isLogged){
                const query = {
                    body: {
                        uid: companyRes.body.data[0]._id
                    }
                }
                const secondsInOneDays = 86400
                const authToken = tokenServices.createCustomToken(req,query,secondsInOneDays)
                // update token in databases also
                const dbToken = await httpService.putRequest({
                    token: authToken,
                    api: "/api/private/user",
                    endpoint: req.get("origin")
                })
                res.cookie("authToken",authToken,{maxAge:(secondsInOneDays*1000)})
                res.status(200).json({
                    isLogged: true,
                    message: "Success"
                })
            }
            else
            {
                res.status(401).json({
                    isLogged: false,
                    message: "wrong password"
                })
            }
        }
        else
        {
            res.status(userRes.status).json(userRes.body)  
        }
    }
    else{
        res.status(companyRes.status).json(companyRes.body)
    }
})

module.exports = router