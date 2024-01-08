require("../modules/db.modules")
const Company = require("../model/company.model")

const store = async (req,res)=>{
    try
    {
        const company = new Company(req.body)
        await company.save()
        res.status(200).json(company)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
 module.exports = store