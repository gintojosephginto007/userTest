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
var logger_1 = require("../../common/logger");
// import fcm from "../../config/firebase/fcm";
var i18n_1 = require("../../config/i18n");
var base_repository_1 = require("./base.repository");
var data_table_controller_1 = require("./data-table.controller");
var baseRepository = new base_repository_1["default"]();
var BaseController = /** @class */ (function (_super) {
    __extends(BaseController, _super);
    function BaseController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseController.prototype.getLoginError = function (params) {
        return {
            status: 'FAILURE',
            statusCode: 422,
            data: {},
            error: {
                // original: params,
                message: "",
                details: [
                    {
                        message: 'Invalid username or password',
                        key: 'password'
                    }
                ]
            }
        };
    };
    BaseController.prototype.setError = function (_a) {
        var response = _a.response, params = _a.params;
        return response.status(422).json(this.getLoginError(params));
    };
    BaseController.prototype.setResponse = function (_a) {
        var response = _a.response, msgType = _a.msgType, statusFlag = _a.statusFlag, statusCode = _a.statusCode, message = _a.message, data = _a.data, error = _a.error;
        try {
            /* if (msgType) {
              let translatedMessage = i18n.__(msgType);
              if (translatedMessage === msgType) {
                globalLogger.error('Translated Message Missing', { msgType });
                translatedMessage = message;
              }
              message = translatedMessage || message;
              if (data && data?.message) {
                data.message = translatedMessage;
              }
              if (error?.message) {
                error.message = translatedMessage;
              } else if (error?.details?.[0]) {
                error.details[0].message = translatedMessage;
              } else {
                error = translatedMessage;
              }
            } */
            if (msgType !== undefined) {
                var translatedMessage = i18n_1["default"].__(msgType);
                if (translatedMessage !== msgType) {
                    message = translatedMessage;
                    if (data != null && data !== undefined) {
                        if (data.message !== null) {
                            data.message = translatedMessage;
                        }
                        if (error !== null && error !== undefined) {
                            if (error.details !== null && Array.isArray(error.details) && error.details.length) {
                                if (error.details[0] !== null && error.details[0] !== undefined) {
                                    if (error.details[0].message !== null) {
                                        error.details[0].message = translatedMessage;
                                    }
                                }
                            }
                            else if (error.message !== null && error !== undefined) {
                                error.message = translatedMessage;
                            }
                            else {
                                error = translatedMessage;
                            }
                        }
                    }
                }
            }
            if (statusCode && statusCode > 200) {
                logger_1.globalLogger.log('error', "server error: " + message, { statusCode: statusCode, statusFlag: statusFlag, error: error, path: response.path, body: response.body });
                if (statusCode >= 500) {
                    logger_1.databaseLogger.log('error', "Database error: " + message, { statusCode: statusCode, statusFlag: statusFlag, error: error, path: response.path, body: response.body });
                    statusCode = 500;
                    statusFlag = false;
                    message = i18n_1["default"].__('went_wrong');
                }
            }
            statusCode = statusCode < 200 ? statusCode = 200 : statusCode;
            data = statusFlag ? __assign({ 'message': message }, data) : {};
            error = !statusFlag ? error ? error : { message: message, details: [] } : { 'message': '', details: [] };
            var status_1 = statusFlag ? 'SUCCESS' : 'FAILURE';
            response.status(statusCode).json({
                status: status_1,
                statusCode: statusCode,
                data: data,
                error: error
            });
        }
        catch (error) {
            logger_1.globalLogger.info("server error: setResponse catch Error", { msgType: msgType, statusFlag: statusFlag, statusCode: statusCode, message: message, data: data, error: error });
            statusCode = 500;
            status = 'FAILURE';
            data = {};
            error = { 'message': i18n_1["default"].__('went_wrong'), details: [] };
            response.status(statusCode).json({
                status: status,
                statusCode: statusCode,
                data: data,
                error: error
            });
        }
    };
    BaseController.prototype.excuteQuery = function (_a) {
        var sqlQuery = _a.sqlQuery, params = _a.params, isSingle = _a.isSingle;
        return baseRepository.excuteQuery({ sqlQuery: sqlQuery, params: params, isSingle: isSingle });
    };
    return BaseController;
}(data_table_controller_1["default"]));
exports["default"] = BaseController;
