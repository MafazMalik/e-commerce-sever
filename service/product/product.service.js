const productRepo = require('../../repository/product/product.repo');

exports.addProduct = (req) => {
    return new Promise(async (resolve) => {
        let outputResponse = {};
        try {
            let productData = {};
            productData = req.body;
            let addProductResponse = await productRepo.addProduct(productData);
            if (!addProductResponse.errorStatus) {
                outputResponse.responseCode = 'INSERT_SUCCESS';
                outputResponse.statusCode = 200;
                outputResponse.status = true;
                outputResponse.message = addProductResponse.errorMessage;
            } else {
                outputResponse.responseCode = addProductResponse.errorCode;
                outputResponse.statusCode = 409;
                outputResponse.status = false;
                outputResponse.message = addProductResponse.errorMessage;
                outputResponse.data = addProductResponse;
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

exports.getProduct = (req) => {
    return new Promise(async (resolve) => {
        let outputResponse = {};
        try {
            if (req.query.productId) {
                var getProductResponse = await productRepo.getProduct(req.query.productId);
            }
            else {
                var getProductResponse = await productRepo.getProduct();
            }
            if (!getProductResponse.errorStatus) {
                outputResponse.responseCode = 'DATA_FOUND';
                outputResponse.statusCode = 200;
                outputResponse.status = true;
                outputResponse.message = getProductResponse.errorMessage;
                outputResponse.data = getProductResponse.data;

            } else {
                outputResponse.responseCode = getProductResponse.errorCode;
                outputResponse.statusCode = 409;
                outputResponse.status = false;
                outputResponse.message = getProductResponse.errorMessage;
                outputResponse.data = {};
            }
            resolve(outputResponse);
        }
        catch (error) {
            outputResponse.status = false;
            outputResponse.responseCode = error;
            outputResponse.statusCode = 500;
            outputResponse.message = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    });
};

exports.updateProduct = (req) => {
    return new Promise(async (resolve) => {
        let outputResponse = {};
        let productData = req.body;
        try {
            let updateProductResponse = await productRepo.updateProduct(productData);
            if (!updateProductResponse.errorStatus) {
                outputResponse.responseCode = 'UPDATE_SUCCESS';
                outputResponse.statusCode = 200;
                outputResponse.status = true;
                outputResponse.message = updateProductResponse.errorMessage;
                outputResponse.data = updateProductResponse.data;
            } else {
                outputResponse.responseCode = updateProductResponse.errorCode;
                outputResponse.statusCode = 409;
                outputResponse.status = false;
                outputResponse.message = updateProductResponse.errorMessage;
                outputResponse.data = {};
            }
            resolve(outputResponse);
        }
        catch (error) {
            outputResponse.status = false;
            outputResponse.responseCode = error;
            outputResponse.statusCode = 500;
            outputResponse.message = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    });
};

exports.deleteProduct = (req) => {
    return new Promise(async (resolve) => {
        let outputResponse = {};
        let productData = req.body;
        try {
            let deleteProductResponse = await productRepo.deleteProduct(productData);
            if (!deleteProductResponse.errorStatus) {
                outputResponse.responseCode = 'DELETE_SUCCESS';
                outputResponse.statusCode = 200;
                outputResponse.status = true;
                outputResponse.message = deleteProductResponse.errorMessage;
            } else {
                outputResponse.responseCode = deleteProductResponse.errorCode;
                outputResponse.statusCode = 409;
                outputResponse.status = false;
                outputResponse.message = deleteProductResponse.errorMessage;
                outputResponse.data = deleteProductResponse;
            }
            resolve(outputResponse);
        }
        catch (error) {
            outputResponse.status = false;
            outputResponse.responseCode = error;
            outputResponse.statusCode = 500;
            outputResponse.message = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    });
};