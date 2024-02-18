const jwt = require('jsonwebtoken')
const {
    secretKey,
    expiresIn
} = require("../config/config")

function generateToken(uid, scope) {
    const token = jwt.sign({
        uid,
        scope
    },
        secretKey, {
        expiresIn
    })

    return token
}

function verifyToken(token) {
    try {
        console.log(jwt.verify(token, secretKey));
        return true
    } catch (e) {
        if (e.expiredAt) {
            return 
        }
        return false
    }
}


module.exports = {
    generateToken, verifyToken
}