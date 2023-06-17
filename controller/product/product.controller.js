const service = require('../../service/product/product.service');
const sendResponse = require('../../function/response');

exports.addProduct = async (req, res) => {
    try {
        let apiResponse = {};
        let responseAddProduct = await service.addProduct(req);
        if (responseAddProduct.statusCode == 200) {
            apiResponse = responseAddProduct.data
        }
        sendResponse.sendResponseObj(responseAddProduct.statusCode, responseAddProduct.status, responseAddProduct.responseCode, responseAddProduct.message, apiResponse, res);
    }
    catch (error) {
        sendResponse.sendResponseObj(500, false, error, error.message, {}, res);
    }
};

exports.getProduct = async (req, res) => {
    try {
        // if (req.body || req.query.productId) {
            let apiResponse = {};
            let responseGetProduct = await service.getProduct(req);
            if (responseGetProduct.statusCode == 200) {
                apiResponse = responseGetProduct.data
            }
            sendResponse.sendResponseObj(responseGetProduct.statusCode, responseGetProduct.status, responseGetProduct.responseCode, responseGetProduct.message, apiResponse, res);
        }
    // }
    catch (error) {
        sendResponse.sendResponseObj(500, false, error, error.message, {}, res);
    }
};