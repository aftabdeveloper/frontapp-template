const express = require("express")
const router = express.Router()
const tokenServices = require("../services/token.service")
const issServices = require("../services/iss.service")
const companyController = require("../controller/company.controller")

router.post("/",(req,res)=>{
    companyController.createCompany(req,res)
})

module.exports = router