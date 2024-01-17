const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")

router.post("/", async (req,res)=>{
    await userController.createUser(req,res)
})

router.get("/:query", async (req,res)=>{
    await userController.getUserByQuery(req,res)
})

module.exports = router