const express = require("express")
const router = express.Router()

router.post("/",(req,res)=>{
    res.json({
        message: req.body
    })
})

module.exports = router