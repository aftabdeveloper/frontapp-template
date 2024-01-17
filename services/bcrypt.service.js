const bcrypt = require("bcrypt")

const encrypt = async (data)=>{
    const encryptedData = await bcrypt.hash(data.toString(),12)
    return encryptedData;
}

const decrypt = async(hashPassword,typedPassword)=>{
    const decryptedData = await bcrypt.compare(typedPassword,hashPassword)
    return decryptedData;
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}