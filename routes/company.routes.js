const express = require("express")
const router = express.Router()
const tokenServices = require("../services/token.service")
const issServices = require("../services/iss.service")
const companyController = require("../controller/company.controller")

router.post("/",(req,res)=>{
    const {iss, token} = req.body
    if(issServices.indexOf(iss) != -1) {
        const response = tokenServices.verifyToken(token)
        if(response.isVerified) companyController.create(response.data,res)
    }
    else
    {
        res.status(401).json({
            message: "Permission Denied!"
        })
    }

})

module.exports = router