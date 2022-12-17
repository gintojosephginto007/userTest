"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fcm from "../../config/firebase/fcm";
const i18n_1 = __importDefault(require("../../config/i18n"));
const base_repository_1 = __importDefault(require("./base.repository"));
const data_table_controller_1 = __importDefault(require("./data-table.controller"));
const baseRepository = new base_repository_1.default();
class BaseController extends data_table_controller_1.default {
    getLoginError(params) {
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
    }
    setError({ response, params }) {
        return response.status(422).json(this.getLoginError(params));
    }
    setResponse({ response, msgType, statusFlag, statusCode, message, data, error }) {
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
                const translatedMessage = i18n_1.default.__(msgType);
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
                // globalLogger.log('error', `server error: ${message}`, { statusCode, statusFlag, error, path: response.path, body: response.body });
                if (statusCode >= 500) {
                    // databaseLogger.log('error', `Database error: ${message}`, { statusCode, statusFlag, error, path: response.path, body: response.body });
                    statusCode = 500;
                    statusFlag = false;
                    message = i18n_1.default.__('went_wrong');
                }
            }
            statusCode = statusCode < 200 ? statusCode = 200 : statusCode;
            data = statusFlag ? Object.assign({ 'message': message }, data) : {};
            error = !statusFlag ? error ? error : { message, details: [] } : { 'message': '', details: [] };
            const status = statusFlag ? 'SUCCESS' : 'FAILURE';
            response.status(statusCode).json({
                status,
                statusCode,
                data,
                error
            });
        }
        catch (error) {
            // globalLogger.info(`server error: setResponse catch Error`, { msgType, statusFlag, statusCode, message, data, error });
            statusCode = 500;
            status = 'FAILURE';
            data = {};
            error = { 'message': i18n_1.default.__('went_wrong'), details: [] };
            response.status(statusCode).json({
                status,
                statusCode,
                data,
                error
            });
        }
    }
    excuteQuery({ sqlQuery, params, isSingle }) {
        return baseRepository.excuteQuery({ sqlQuery, params, isSingle });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.controller.js.map