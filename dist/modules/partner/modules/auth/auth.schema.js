"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const joi_custom_schema_1 = require("../../../../common/validators/joi-custom-schema");
const i18n_1 = __importDefault(require("../../../../config/i18n"));
const loginSchema = joi_1.default.object().keys({
    email_address: joi_custom_schema_1.StringInput.email().required().label(i18n_1.default.__('label_email_address')),
    password: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_password'))
});
const newPasswordOptions = {
    messages: {
        "es_ES": {
            "string.min": "La longitud de {{#label}} debe tener un mínimo de {{#limit}} caracteres.",
            "string.max": "La longitud de {{#label}} debe tener un máximo de {{#limit}} caracteres.",
            "string.pattern.base": "Ingrese una {{#label}} válida."
        },
        "en_US": {
            "string.min": "{{#label}} length must be minimum {{#limit}} characters long.",
            "string.max": "{{#label}} length must be maximum {{#limit}} characters long.",
            "string.pattern.base": "Please enter a valid {{#label}} ."
        }
    }
};
const password = joi_custom_schema_1.StringInput
    .min(8)
    .max(15)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z-9])(?=.*[0-9])(?=.*[!@#$%^&*<>])[a-zA-Z0-9!@#$%^&*<>]{8,15}$/))
    .options(newPasswordOptions);
const resetPasswordSchema = joi_1.default.object().keys({
    email_address: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_email_address')),
    new_password: password.label(i18n_1.default.__('label_new_password')).required(),
    confirm_password: joi_1.default
        .options({
        messages: {
            "es_ES": {
                "any.only": "Las dos contraseñas no coinciden."
            },
            "en_US": {
                "any.only": "The two passwords do not match."
            }
        }
    }).valid(joi_1.default.ref('new_password'))
        .label(i18n_1.default.__('label_confirm_password'))
});
const changePasswordSchema = joi_1.default.object().keys({
    email_address: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_email_address')),
    current_password: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_current_password')),
    new_password: password.label(i18n_1.default.__('label_new_password')).required(),
    confirm_password: joi_1.default
        .options({
        messages: {
            "es_ES": {
                "any.only": "Las dos contraseñas no coinciden."
            },
            "en_US": {
                "any.only": "The two passwords do not match."
            }
        }
    }).valid(joi_1.default.ref('new_password'))
        .label(i18n_1.default.__('label_confirm_password'))
});
const forgotPasswordSchema = joi_1.default.object().keys({
    email_address: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_email_address')),
});
const verifyForgotPasswordSchema = joi_1.default.object().keys({
    unique_key: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_unique_key')),
});
exports.AuthSchema = {
    '/login': loginSchema,
    '/resetPassword': resetPasswordSchema,
    '/changePassword': changePasswordSchema,
    '/forgotPassword': forgotPasswordSchema,
    '/verifyForgotPassword': verifyForgotPasswordSchema,
};
//# sourceMappingURL=auth.schema.js.map