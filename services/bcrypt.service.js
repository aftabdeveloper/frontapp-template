const bcrypt = require("bcrypt")

const encrypt = async (data)=>{
    const encryptedData = await bcrypt.hash(data.toString(),12)
    return encryptedData;
}

module.exports = {
    encrypt: encrypt
}