const express = require("express")
const router = express.Router()
const companyController = require("../controller/company.controller")

router.post("/", async (req,res)=>{
    await companyController.createCompany(req,res)
})

router.get("/:query", async (req,res)=>{
    await companyController.getRecordByQuery(req,res)
})

module.exports = router