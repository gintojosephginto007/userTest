"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
exports.default = (useJoiError = false, Schemas) => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = lodash_1.default.isBoolean(useJoiError) && useJoiError;
    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put'];
    // Joi validation options
    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        escapeHtml: true,
        stripUnknown: true // remove unknown keys from the validated data
    };
    // return the validation middleware
    return (req, res, next) => {
        const route = req.path;
        const method = req.method.toLowerCase();
        if (lodash_1.default.includes(_supportedMethods, method) && lodash_1.default.has(Schemas, route)) {
            // get schema for the current route
            const _schema = lodash_1.default.get(Schemas, route);
            if (_schema) {
                // Validate req.body using the schema and validation options
                const { error, value } = _schema.validate(req.body, _validationOptions);
                if (error) {
                    if (req.isFile) {
                        fs_1.default.unlinkSync(req.file.path);
                    }
                    // Joi Error
                    const JoiError = {
                        status: 'FAILURE',
                        statusCode: 422,
                        data: {},
                        error: {
                            // original: error._object,
                            // fetch only message and type from each error
                            details: lodash_1.default.uniqBy(lodash_1.default.map(error.details, ({ message, type, context }) => ({
                                message: message.replace(/[""]/g, ''),
                                key: context.key,
                                // type,
                            })), 'key')
                        }
                    };
                    // Custom Error
                    const CustomError = {
                        data: {},
                        statusCode: 422,
                        status: 'FAILURE',
                        error: 'Invalid request data. Please review request and try again.'
                    };
                    // Send back the JSON error response
                    res.status(422).json(_useJoiError ? JoiError : CustomError);
                }
                else {
                    // Replace req.body with the data after Joi validation
                    req.body = value;
                    next();
                }
            }
        }
        else {
            next();
        }
    };
};
//# sourceMappingURL=schema-validator.middleware.js.map