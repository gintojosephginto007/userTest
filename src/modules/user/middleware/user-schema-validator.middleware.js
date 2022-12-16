"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var config_1 = require("../../../config/config");
var i18n_1 = require("../../../config/i18n");
exports["default"] = (function (useJoiError, Schemas) {
    if (useJoiError === void 0) { useJoiError = false; }
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    var _useJoiError = lodash_1["default"].isBoolean(useJoiError) && useJoiError;
    // enabled HTTP methods for request data validation
    var _supportedMethods = ['post', 'put'];
    // Joi validation options
    var _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
        errors: {
            escapeHtml: true
        }
    };
    // return the validation middleware
    return function (req, res, next) {
        try {
            var locale = config_1["default"].localizationLanguage; // es_ES - Spanish, en_US - English
            i18n_1["default"].setLocale(locale);
            _validationOptions.messages = i18n_1["default"].getCatalog("joi_" + locale) || {}; // await import(`../../../../assets/locales/i18n/joi_${locale}.json`) as { [key: string]: any } // await import(`../../../../assets/locales/joi/${locale}.json`) as { [key: string]: any }
            _validationOptions.errors.language = locale;
            var route = req.path;
            var method = req.method.toLowerCase();
            if (!lodash_1["default"].includes(_supportedMethods, method) && !lodash_1["default"].has(Schemas, route)) {
                next();
                return;
            }
            // get schema for the current route
            var _schema = lodash_1["default"].get(Schemas, route);
            if (!_schema) {
                next();
                return;
            }
            // Validate req.body using the schema and validation options
            var _a = _schema.validate(req.body, _validationOptions), error = _a.error, value = _a.value;
            if (!error) {
                // Replace req.body with the data after Joi validation
                req.body = value;
                next();
                return;
            }
            if (req.isFile) {
                fs_1["default"].unlinkSync(req.file.path);
            }
            // Joi Error
            var JoiError = {
                status: 'FAILURE',
                statusCode: 422,
                data: {},
                error: {
                    // original: error._object,
                    // fetch only message and type from each error
                    details: lodash_1["default"].uniqBy(lodash_1["default"].map(error.details, function (_a) {
                        var message = _a.message, type = _a.type, context = _a.context;
                        return ({
                            message: message === null || message === void 0 ? void 0 : message.replace(/[""]/g, ''),
                            key: context.key
                        });
                    }), 'key')
                }
            };
            // Custom Error
            var CustomError = {
                data: {},
                statusCode: 422,
                status: 'FAILURE',
                error: 'Invalid request data. Please review request and try again.'
            };
            // Send back the JSON error response
            res.status(422).json(_useJoiError ? JoiError : CustomError);
        }
        catch (error) {
            next(error);
        }
    };
});
