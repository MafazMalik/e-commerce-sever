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