const express = require("express") 
const router = express.Router()
const authController = require("../controller/auth.controller")
router.get("/", async (req,res)=>{
    await authController.logout(req,res)
})

module.exports = router