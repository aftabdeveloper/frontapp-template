const ajax = require("supertest")

const postRequest = (req)=>{
    ajax(req.endpoint)
    .post(req.api)
    .send({token:req.token})
    .end((err,dataRes)=>{
         console.log(dataRes.body)
    })
}

module.exports = {
    postRequest: postRequest
}