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

const getRecordByQuery = async (req,res)=>{
    const token = tokenServices.verifyToken(req)
    
    if(token.isVerified){
        const query = {
            email: token.data.email
        }
        const response = await Company.find(query)
        console.log(response)
    }
    else{
        res.status(401).json({
            message:"Permission denied"
        })
    }
}
 module.exports = {
    createCompany: createCompany,
    getRecordByQuery: getRecordByQuery
 }