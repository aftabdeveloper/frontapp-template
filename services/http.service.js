const ajax = require("supertest")

const postRequest = (req)=>{
    ajax(req.endpoint)
    .post(req.api)
    .send(req.data)
    .end((err,dataRes)=>{
        
    })
}

module.exports = {
    postRequest: postRequest
}