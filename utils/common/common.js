module.exports = function () {
    const bcrypt = require("bcryptjs");
    const { Op } = require("sequelize");

    const db = require("../../models");

    this.hashPassword = function (password, saltRounds) {
        return new Promise(function (resolve, reject) {
            try {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        err = false;
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            } catch (error) {
                let err = {};
                err.error = true;
                err.message = "Error: " + error;
                resolve(err);
            }
        });
    };

    this.comparePassword = function (password, hash) {
        return new Promise(function (resolve) {
            try {
                bcrypt.compare(password, hash, function (err, result) {
                    if (err) {
                        err = false;
                        resolve(err);
                    } else {
                        resolve(result);
                    }
                });
            } catch (error) {
                let err = {};
                err.error = true;
                err.message = "Error: " + error;
                resolve(err);
            }
        });
    };

    this.fetchUserDetails = function (username) {

        return new Promise(async function (resolve, reject) {
            let outputResponse = {};
            try {
                db.users.findOne({
                    logging: console.log,
                    where: {
                        [Op.or]: [
                            {
                                userName: username,
                            },
                            {
                                email: username,
                            }
                        ],
                    },
                })
                    .then((users) => {
                        console.log(users);
                        if (users) {
                            outputResponse.errorStatus = false;
                            outputResponse.errorCode = "DATA_FOUND";
                            outputResponse.errorMessage = "";
                            outputResponse.data = users;

                        }
                        else {
                            outputResponse.errorStatus = true;
                            outputResponse.errorCode = "DATA_NOT_FOUND";
                            outputResponse.errorMessage = "No Data found";
                            outputResponse.data = {};

                        }
                        resolve(outputResponse);
                    })
                    .catch((error) => {
                        // console.log(error);
                        outputResponse.errorStatus = true;
                        if (error.code) {
                            outputResponse.errorCode = error.code;
                        } else {
                            outputResponse.errorCode = "DB_ERROR".error;
                        }
                        outputResponse.errorMessage = error.message;
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
};