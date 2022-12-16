"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const i18n_1 = __importDefault(require("../../../../config/i18n"));
const joi_custom_schema_1 = require("../../../../common/validators/joi-custom-schema");
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
const changePasswordSchema = joi_1.default.object().keys({
    user_id: joi_1.default.number().required().label('label_user_id'),
    current_password: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_current_password')),
    new_password: password.label(i18n_1.default.__('label_new_password')).required(),
    email_address: joi_custom_schema_1.StringInput.label(i18n_1.default.__('email_address')),
    company_id: joi_1.default.number(),
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
const updateBrandUserDetailsSchema = joi_1.default.object().keys({
    user_id: joi_1.default.number().required().label('label_user_id'),
    first_name: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_first_name')),
    last_name: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('label_last_name')),
    email_address: joi_custom_schema_1.StringInput.required().label(i18n_1.default.__('email_address')),
    mobile_number: joi_custom_schema_1.StringInput.required().min(10).pattern(new RegExp(/^\d+$/)).options({
        messages: {
            "es_ES": {
                "string.min": "Por favor, introduzca un número de móvil válido.",
                "string.pattern.base": "Por favor, introduzca un número de móvil válido.",
            },
            "en_US": {
                "string.min": "Please enter a valid mobile number.",
                "string.pattern.base": "Please enter a valid mobile number.",
            }
        }
    }).label(i18n_1.default.__('label_mobile_number')),
    files: joi_1.default.array().items(joi_1.default.object().keys({
        item: joi_1.default.number().required(),
        source_key: joi_1.default.string().required(),
        file_name: joi_1.default.string().optional().allow(null),
        content_type: joi_1.default.string().optional().allow(null)
    })).optional().length(1)
});
exports.UserProfileSchema = {
    '/changePassword': changePasswordSchema,
    '/updateBrandUserDetails': updateBrandUserDetailsSchema
};
//# sourceMappingURL=user-profile.schema.js.map