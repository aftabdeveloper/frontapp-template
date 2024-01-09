const mongoose = require("mongoose")
const { Schema } = mongoose

const companySchema = new Schema({
    company_name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    mobile: Number,
    emailVerified: {
        type: Boolean,
        default: false
    },
    mobileVerified: {
        type: Boolean,
        default: false
    },
    created_At: {
        type: Date,
        default: Date.now
    }
})

 companySchema.pre("save", async function(next){
     const query = {
         company_name: this.company_name
     }
     const counts = await mongoose.model('Company').countDocuments(query)
     if(counts > 0) {
         res.status(409).json({
            message: "Company already exists"
         })
     }
     else{
         next()
     }
 })

 companySchema.pre("save", async function(next){
     const query = {
         email: this.email
     }
     const counts = await mongoose.model('Company').countDocuments(query)
     if(counts > 0) {
         res.status(409).send("Email already exists")
     }
     else{
         next()
     }
 })

const Company = mongoose.model("Company", companySchema)
module.exports = Company