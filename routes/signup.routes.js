const express = require("express")
const router = express.Router()
const tokenServices = require("../services/token.service")
const httpServices = require("../services/http.service")

router.post("/", async (req,res)=>{
   const {password} = req.body
   const expiresIn = 120
   const token = tokenServices.createToken(req,expiresIn)
   const request = {
      token:token,
      api:"/api/private/company",
      endpoint: req.get('origin')
   }
   const companyRes = await httpServices.postRequest(request)
   const {data:{_id}} = companyRes.body
   const userToken = tokenServices.createCustomToken(req,{
      body: {
         uid: _id,
         password: password
      }
   },expiresIn)
   const userRes = await httpServices.postRequest({
      token: userToken,
      api: "/api/private/user",
      endpoint: req.get('origin')
   })
   console.log(userRes.body)
})

module.exports = router