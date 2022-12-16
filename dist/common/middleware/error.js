"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
class JSONParseError extends SyntaxError {
}
exports.default = (err, req, res, next) => {
    logger_1.globalLogger.log('error', err.message, { error: err, path: req.path, body: req.body });
    let responseStatus = 500;
    let jsonResponse = {
        data: {},
        error: {},
        message: 'Something went wrong.',
        status: 'FAILURE',
        statusCode: responseStatus
    };
    if (err instanceof SyntaxError && err.status === 400) {
        responseStatus = 400;
        jsonResponse = Object.assign(Object.assign({}, jsonResponse), { error: {
                code: 'INVALID_JSON',
                message: 'The body of your request is not valid JSON.'
            }, statusCode: responseStatus });
    }
    return res.status(responseStatus).json(jsonResponse);
};
//# sourceMappingURL=error.js.map