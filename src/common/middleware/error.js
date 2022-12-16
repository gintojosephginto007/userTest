"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var logger_1 = require("../logger");
var JSONParseError = /** @class */ (function (_super) {
    __extends(JSONParseError, _super);
    function JSONParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JSONParseError;
}(SyntaxError));
exports["default"] = (function (err, req, res, next) {
    logger_1.globalLogger.log('error', err.message, { error: err, path: req.path, body: req.body });
    var responseStatus = 500;
    var jsonResponse = {
        data: {},
        error: {},
        message: 'Something went wrong.',
        status: 'FAILURE',
        statusCode: responseStatus
    };
    if (err instanceof SyntaxError && err.status === 400) {
        responseStatus = 400;
        jsonResponse = __assign(__assign({}, jsonResponse), { error: {
                code: 'INVALID_JSON',
                message: 'The body of your request is not valid JSON.'
            }, statusCode: responseStatus });
    }
    return res.status(responseStatus).json(jsonResponse);
});
