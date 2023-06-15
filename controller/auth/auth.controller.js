const sendResponse = require('../../function/response');
const service = require('../../service/auth/auth.service');

exports.signup = async (req, res) => {
    try {
        let apiResponse = {};
        let responseSignup = await service.signup(req);
        if (responseSignup.statusCode == 200) {
            apiResponse = responseSignup.data;
        }
        sendResponse.sendResponseObj(responseSignup.statusCode, responseSignup.status, responseSignup.responseCode, responseSignup.message, apiResponse, res);
        // res.status(200).send('Signup Successfully');
    }
    catch (error) {
        sendResponse.sendResponseObj(500, false, error, error.message, {}, res);
    }
};

exports.login = async (req, res) => {
    try {
        let apiResponse = {};
        let responseLogin = await service.login(req);
        if (responseLogin.statusCode == 200) {
            apiResponse = responseLogin.data;
        }
        sendResponse.sendResponseObj(responseLogin.statusCode, responseLogin.status, responseLogin.responseCode, responseLogin.message, apiResponse, res);
    } catch (error) {
        sendResponse.sendResponseObj(500, false, error.code, error.message, {}, res);
    }
};