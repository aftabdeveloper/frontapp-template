const express = require("express")
const router = express.Router()

router.post("/",(req,res)=>{
    console.log(req.body)
    res.json({
        message: req.body
    })
})

module.exports = router