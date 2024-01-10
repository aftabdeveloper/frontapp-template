require("../modules/db.modules")
const tokenServices = require("../services/token.service")
const Company = require("../model/company.model")

const createCompany = async (req,res)=>{
        const {data, isVerified} = tokenServices.verifyToken(req)
        if(isVerified)
        {
            try
            {
                const company = new Company(data)
                const dataRes = await company.save()
                res.status(200).json({
                    isCompanyCreated: true,
                    message: "Company created",
                    data: dataRes
                })
            }
            catch(err)
            {
                res.status(409).json({
                    isCompanyCreated: false,
                    message: err
                })
            }
        }
}
 module.exports = {
    createCompany: createCompany
 }