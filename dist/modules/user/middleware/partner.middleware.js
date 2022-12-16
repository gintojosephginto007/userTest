"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (request, response, next) => {
    let token = '';
    if (request.headers.authorization) {
        token = request.headers.authorization;
    }
    else {
        token = request.body.token || request.query.token;
    }
    const details = [];
    const authError = {
        status: 'FAILURE',
        statusCode: 401,
        data: {},
        error: {
            message: 'Un-authorised access',
            details
        }
    };
    if (!token) {
        response.status(authError.statusCode).json(authError);
        return;
    }
};
//# sourceMappingURL=partner.middleware.js.map