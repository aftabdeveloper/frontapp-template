const express = require("express")
const router = express.Router()
const store = require("../controller/company.controller")

router.post("/",(req,res)=>{
   return store(req,res)
})

module.exports = router