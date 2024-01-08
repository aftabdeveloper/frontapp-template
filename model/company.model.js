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
    created_At: {
        type: Date,
        default: Date.now
    }

})

const Company = mongoose.model("Company", companySchema)
module.exports = Company