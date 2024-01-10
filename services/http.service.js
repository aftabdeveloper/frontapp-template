const ajax = require("supertest")

const postRequest = async (req)=>{
    const postRes = await ajax(req.endpoint)
    .post(req.api)
    .send({token:req.token});
    return postRes;
}

module.exports = {
    postRequest: postRequest
}