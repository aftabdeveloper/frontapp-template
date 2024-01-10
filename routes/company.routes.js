const express = require("express")
const router = express.Router()
const companyController = require("../controller/company.controller")

router.post("/", async (req,res)=>{
    await companyController.createCompany(req,res)
})

module.exports = router