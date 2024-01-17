const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("profile.pug")
})

module.exports = router