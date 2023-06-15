const expressConfig = require('../../config')();
const jwt = require('jsonwebtoken');
const errorObj = require('../../function/error');
const errorCode = require('../../variables/errorCodes');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        errorObj.sendErrorObj(res, errorCode.token_err, "Token Not Found!");
    } else {
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) {
            errorObj.sendErrorObj(res, errorCode.token_err, "Token Not Found!");
        } else {
            jwt.verify(token, expressConfig.TOKEN_SECRET, (err, user) => {
                if (err) {
                    errorObj.sendErrorObj(res, errorCode.token_err, "Invalid Token!");
                }
                req.user = user;
                if (Date.now() >= user.exp * 1000) {
                    errorObj.sendErrorObj(res, 'TOKEN_EXP', "Token Expired!");
                }
                else {
                    next();
                }

            });
        }
    }
}

exports.generateAccessToken = (payload,expTime='86400s') => {
    return new Promise(async function (resolve) {
        try {
            let token = jwt.sign(payload, expressConfig.TOKEN_SECRET, {
                expiresIn: expTime
            });
            resolve(token);
        } catch (error) {
            console.log(error);
        }
    });
}