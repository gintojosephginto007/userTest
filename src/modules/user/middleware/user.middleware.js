"use strict";
exports.__esModule = true;
var auth_repository_1 = require("../modules/auth/auth.repository");
var authRepository = new auth_repository_1["default"]();
exports["default"] = (function (request, response, next) {
    var token = '';
    if (request.headers.authorization) {
        token = request.headers.authorization;
    }
    else {
        token = request.body.token || request.query.token;
    }
    var details = [];
    var authError = {
        status: 'FAILURE',
        statusCode: 401,
        data: {},
        error: {
            message: 'Un-authorised access',
            details: details
        }
    };
    if (!token) {
        response.status(authError.statusCode).json(authError);
        return;
    }
});
