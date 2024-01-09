require("../modules/db.modules")
const Company = require("../model/company.model")

const create = async (req,res)=>{
    try
    {
        const company = new Company(req)
        await company.save()
        res.status(200).json(company)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
 module.exports = {
    create: create
 }