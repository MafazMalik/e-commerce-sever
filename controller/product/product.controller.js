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
        let apiResponse = {};
        let responseGetProduct = await service.getProduct(req);
        if (responseGetProduct.statusCode == 200) {
            apiResponse = responseGetProduct.data
        }
        sendResponse.sendResponseObj(responseGetProduct.statusCode, responseGetProduct.status, responseGetProduct.responseCode, responseGetProduct.message, apiResponse, res);
    }
    catch (error) {
        sendResponse.sendResponseObj(500, false, error, error.message, {}, res);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        if (req.body) {
            let apiResponse = {};
            let responseUpdateProduct = await service.updateProduct(req);
            if (responseUpdateProduct.statusCode == 200) {
                apiResponse = responseUpdateProduct.data
            }
            sendResponse.sendResponseObj(responseUpdateProduct.statusCode, responseUpdateProduct.status, responseUpdateProduct.responseCode, responseUpdateProduct.message, apiResponse, res);
        } else {
            sendResponse.sendResponseObj(400, false, 'BAD_REQUEST', 'Invalid Payload', {}, res);
        }
    }
    catch (error) {
        sendResponse.sendResponseObj(500, false, error, error.message, {}, res);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        if (req.body) {
            let apiResponse = {};
            let responseDeleteProduct = await service.deleteProduct(req);
            if (responseDeleteProduct.statusCode == 200) {
                apiResponse = responseDeleteProduct.data
            }
            sendResponse.sendResponseObj(responseDeleteProduct.statusCode, responseDeleteProduct.status, responseDeleteProduct.responseCode, responseDeleteProduct.message, apiResponse, res);
        } else {
            sendResponse.sendResponseObj(400, false, 'BAD_REQUEST', 'Invalid Payload', {}, res);
        }
    }
    catch (error) {
        sendResponse.sendResponseObj(500, false, error, error.message, {}, res);
    }
}