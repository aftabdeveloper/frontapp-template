require("../modules/db.modules")
const tokenServices = require("../services/token.service")
const Company = require("../model/company.model")

const createCompany = async (req,res)=>{
     const {data} = tokenServices.verifyToken(req)
     try
     {
         const company = new Company(data)
         await company.save()
         res.status(200).json(company)
     }
     catch(err)
     {
         res.status(500).json(err)
     }
}
 module.exports = {
    createCompany: createCompany
 }