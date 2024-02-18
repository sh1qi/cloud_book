const jwt = require('jsonwebtoken')
const {
    secretKey,
    expiresIn
} = require("../config/config")

class Auth {

    get middleware() {
        return async (req, res, next) => {
            const token = req.headers.authorization;
            if (!token || token === undefined) {
                res.status(200).json({
                    error: 10001,
                    errorMag: '账户不合法'
                })
                return
            }
            try {
                const isValid = jwt.verify(token, secretKey)
                res.status(200).json({
                    isValid: true
                })
                return
            } catch (e) {
                console.log(e);
                if (e.expiredAt) {
                    res.status(200).json({
                        error: 10002,
                        errorMag: '登录已过期，请重新登录'
                    })
                    return
                }
            }
            await next()
        }
    }

    static verifyToken(token) {
        try {
            jwt.verify(token, secretKey)
            return true
        } catch (e) {
            return false
        }
    }
}

module.exports = Auth