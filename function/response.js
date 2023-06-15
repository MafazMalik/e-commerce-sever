exports.sendResponseObj = (statusCode, status, responseCode, message, output, res) => {
    res.status(statusCode).json({
        'statusCode': statusCode,
        'status': status,
        'responseCode': responseCode,
        'message': message,
        'data': output
    });
}