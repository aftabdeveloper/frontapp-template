const express = require("express")
const router = express.Router()
const tokenServices = require("../services/token.service")
const httpService = require("../services/http.service")

router.post("/", async (req,res)=>{
    const expiresIn = 120
    const token = tokenServices.createToken(req,expiresIn)
    const companyRes = await httpService.getRequest({
        token: token,
        api: "/api/private/company",
        endpoint: req.get("origin")
    })
    console.log(companyRes)
})

module.exports = router