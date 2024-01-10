const mongoose = require("mongoose")
const bcryptServices = require("../services/bcrypt.service")

const { Schema } = mongoose

const userSchema = new Schema({
    uid:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function(next){
    const enterPassword = this.password
    const encryptPassword = await bcryptServices.encrypt(enterPassword)
    this.password = encryptPassword
})

const User = mongoose.model("User",userSchema)
module.exports = User