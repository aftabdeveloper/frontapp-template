const express = require("express")
const router = express.Router()
const tokenServices = require("../services/token.service")
const httpServices = require("../services/http.service")

router.post("/", (req,res)=>{
   const expiresIn = 120
   const token = tokenServices.createToken(req,expiresIn)
   const request = {
      token:token,
      api:"/api/private/company",
      endpoint: req.get('origin')
   }
   httpServices.postRequest(request)
})

module.exports = router