const db = require('../../models');
const {
    Op
} = require("sequelize");

exports.addProduct = function (productData) {
    return new Promise(async function (resolve, reject) {
        let outputResponse = {};
        try {
            db.products.create(productData).then(productDetails => {
                outputResponse.errorStatus = false;
                outputResponse.errorCode = 'INSERT_SUCCESS';
                outputResponse.errorMessage = 'Inserted Successfully';
                outputResponse.data = productDetails;
                resolve(outputResponse);
            }).catch(error => {
                outputResponse.errorStatus = true;
                if (error.message.errorCode) {
                    outputResponse.errorCode = error.message.errorCode;
                    outputResponse.errorMessage = error.message.message;
                } else {
                    outputResponse.errorCode = 'DB_ERROR';
                    outputResponse.errorMessage = error.message;

                }

                outputResponse.data = {};
                resolve(outputResponse);
            });
        } catch (error) {
            outputResponse.errorStatus = true;
            outputResponse.errorCode = error.code;
            outputResponse.errorMessage = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    });
}

exports.getProduct = function (payload) {
    return new Promise(async function (resolve, reject) {
        let outputResponse = {};
        try {
            let where = {};
            if (payload) {
                where = { productId: payload };
            }
            db.products.findAndCountAll(
                {
                    where: where
                }
            ).then(productData => {
                if (productData) {
                    outputResponse.errorStatus = false;
                    outputResponse.errorCode = 'DATA_FOUND';


                } else {
                    outputResponse.errorStatus = true;
                    outputResponse.errorCode = 'NO_DATA_FOUND';
                }
                outputResponse.errorMessage = '';
                outputResponse.data = productData;
                resolve(outputResponse);
            }).catch(error => {
                outputResponse.errorStatus = true;
                if (error.message.errorCode) {
                    outputResponse.errorCode = error.message.errorCode;
                    outputResponse.errorMessage = error.message.message;
                } else {
                    outputResponse.errorCode = 'DB_ERROR';
                    outputResponse.errorMessage = error.message;

                }

                outputResponse.data = {};
                resolve(outputResponse);
            });
        } catch (error) {
            outputResponse.errorStatus = true;
            outputResponse.errorCode = error.code;
            outputResponse.errorMessage = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    });
};

exports.updateProduct = function (productData) {
    return new Promise(async (resolve) => {
        let outputResponse = {};
        try {
            db.products.update(productData, {
                where: {
                    productId: productData.productId
                }
            }).then(productDetails => {
                outputResponse.errorStatus = false;
                outputResponse.errorCode = 'UPDATE_SUCCESS';
                outputResponse.errorMessage = 'Upated Successfully';
                outputResponse.data = productDetails;
                resolve(outputResponse);
            }).catch(error => {
                outputResponse.errorStatus = true;
                if (error.message.errorCode) {
                    outputResponse.errorCode = error.message.errorCode;
                    outputResponse.errorMessage = error.message.message;
                } else {
                    outputResponse.errorCode = 'DB_ERROR';
                    outputResponse.errorMessage = error.message;

                }

                outputResponse.data = {};
                resolve(outputResponse);
            });
        }
        catch (error) {
            outputResponse.errorStatus = true;
            outputResponse.errorCode = error.code;
            outputResponse.errorMessage = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    })
};

exports.deleteProduct = function (productData) {
    return new Promise(async (resolve) => {
        let outputResponse = {};
        try {
            db.products.destroy({
                where: {
                    productId: productData.productId
                }
            }).then(num => {
                console.log(num)
                if (num) {
                    outputResponse.errorStatus = false;
                    outputResponse.errorCode = 'DELETE_SUCCESS';
                    outputResponse.errorMessage = 'Deleted Successfully';
                }
                else {
                    outputResponse.errorStatus = true;
                    outputResponse.errorCode = 'DELETE_ERROR';
                    outputResponse.errorMessage = 'Not deleted';
                }
                outputResponse.data = {};
                resolve(outputResponse);
            }).catch(error => {
                outputResponse.errorStatus = true;
                if (error.message.errorCode) {
                    outputResponse.errorCode = error.message.errorCode;
                    outputResponse.errorMessage = error.message.message;
                } else {
                    outputResponse.errorCode = 'DB_ERROR';
                    outputResponse.errorMessage = error.message;

                }

                outputResponse.data = {};
                resolve(outputResponse);
            });
        }
        catch (error) {
            outputResponse.errorStatus = true;
            outputResponse.errorCode = error.code;
            outputResponse.errorMessage = error.message;
            outputResponse.data = {};
            resolve(outputResponse);
        }
    })
};