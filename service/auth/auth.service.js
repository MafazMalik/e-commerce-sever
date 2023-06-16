// const { response } = require('express');
const authRepo = require('../../repository/auth/auth.repo');
const Common = require('../../utils/common/common');
const jwtToken = require("../../controller/token/jwt_token");
const expressConfig = require('../../config')();
var common = new Common();

exports.signup = (req) => {
    return new Promise(async (resolve, reject) => {
        let outputResponse = {};
        try {
            let userData = {};
            userData = req.body;
            userData.password = req.body.password ? await common.hashPassword(req.body.password, expressConfig.salt) : null;

            let insertResponse = await authRepo.insertUserData(userData);

            if (!insertResponse.errorStatus) {
                outputResponse.responseCode = 'INSERT_SUCCESS';
                outputResponse.statusCode = 200;
                outputResponse.status = true;
                outputResponse.message = insertResponse.errorMessage;
                // outputResponse.data = token;
            } else {
                outputResponse.responseCode = insertResponse.errorCode;
                outputResponse.statusCode = 409;
                outputResponse.status = false;
                outputResponse.message = insertResponse.errorMessage;
                outputResponse.data = insertResponse;
            }
            resolve(outputResponse);
        } catch (error) {
            outputResponse.status = false;
            outputResponse.responseCode = error;
            outputResponse.statusCode = 500;
            outputResponse.message = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    });
};

exports.login = function (req) {
    return new Promise(async function (resolve) {
        let outputResponse = {};
        try {
            // console.log(req.body);
            let username = req.body.userName;
            let password = req.body.password;
            let passwordVerified = false;
            let payload = {};
            outputResponse.userData = {};
            outputResponse.statusCode = 403;
            let userResponse = await common.fetchUserDetails(username);
            if (!userResponse.errorStatus) {
                let userDetails = userResponse.data;
                // console.log(userDetails)
                passwordVerified = await common.comparePassword(password, userDetails.password);
                if (passwordVerified) {
                    payload.userId = userDetails.userId;
                    payload.userName = userDetails.userName;
                    payload.activeStatus = userDetails.activeStatus;
                    if (payload.activeStatus == 3) {
                        outputResponse.responseCode = 'USER_BLOCKED';
                        outputResponse.statusCode = 401;
                        outputResponse.status = false;
                        outputResponse.message = 'Invalid Username/Password';
                        outputResponse.data = {};
                        resolve(outputResponse);
                    } else {
                        let user = {}
                        token = await jwtToken.generateAccessToken(payload,31104000);
                        user.token = token;
                        user.details = payload;
                        outputResponse.responseCode = 'LOGIN_SUCCESS';
                        outputResponse.statusCode = 200;
                        outputResponse.status = true;
                        outputResponse.message = '';
                        outputResponse.data = user;
                        resolve(outputResponse);
                    }
                } else {
                    outputResponse.responseCode = 'INVALID_PASSWORD';
                    outputResponse.statusCode = 401;
                    outputResponse.status = false;
                    outputResponse.message = 'Invalid Username/Password';
                    outputResponse.data = {};
                    resolve(outputResponse);
                }

            } else {
                outputResponse.responseCode = 'INVALID_USERNAME';
                outputResponse.statusCode = 401;
                outputResponse.status = false;
                outputResponse.message = 'Invalid Username/Password';
                outputResponse.data = {};
                resolve(outputResponse);
            }
        } catch (error) {
            outputResponse.status = false;
            outputResponse.responseCode = error.code;
            outputResponse.statusCode = 500;
            outputResponse.message = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }

    });
};