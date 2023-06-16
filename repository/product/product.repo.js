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