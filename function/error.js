exports.sendErrorObj = (res, code, message) => {
    res.status(500).json({ errorCode: code, errorMessage: message});
}