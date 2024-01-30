const ajax = require("supertest")

const postRequest = async (req)=>{
    const postRes = await ajax(req.endpoint)
    .post(req.api)
    .send({token:req.token});
    return postRes;
}

const getRequest = async (req)=>{
    const getRes = await ajax(req.endpoint)
    .get(req.api+"/"+req.token)
    .set({"X-Auth-Token": req.token})
    return getRes;
}

const putRequest = async (req)=>{
    const putRes = await ajax(req.endpoint)
    .put(req.api+"/"+req.token)
    .send({token: req.token})
    return putRes;
}

module.exports = {
    postRequest: postRequest,
    getRequest: getRequest,
    putRequest: putRequest
}