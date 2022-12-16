"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const joi_custom_input_rules_1 = require("./joi-custom-input-rules");
exports.default = (joi) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.htmlStrip': '"{{#label}}" content invalid',
            'string.capFirst': '"{{#label}}" content invalid',
            'string.validMobile': '"{{#label}}" content invalid',
            'string.validateRange': '"{{#label}}" invalid range',
            'string.validateDateRange': 'invalid "{{#label}}" date range format',
            'string.validateDateRange.min': 'From Date should be less than To Date: {{#value}}'
        },
        rules: {
            unescape: {
                validate(value, helpers, args, options) {
                    const clean = lodash_1.default.unescape(value);
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('string.unescape', { value });
                }
            },
            sanetize: {
                validate(value, helpers, args, options) {
                    const clean = value.replace(/[|&;$%@"<>()+,]/g, '');
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('string.sanetize', { value });
                }
            },
            capFirst: {
                validate(value, helpers, args, options) {
                    const clean = lodash_1.default.startCase(lodash_1.default.toLower(value));
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('string.capFirst', { value });
                }
            },
            validMobile: {
                validate(value, helpers, args, options) {
                    if (value && value.length) {
                        if (value.length > 10) {
                            return value.slice(-10);
                        }
                        return value;
                    }
                    return helpers.error('string.validMobile', { value });
                }
            },
            validateRange: {
                validate(value, helpers, args, options) {
                    if (value && value.length && joi_custom_input_rules_1.rangeFormat.test(value)) {
                        const splitArray = value.split(':');
                        const fromFieldValue = parseFloat(splitArray[0]);
                        const toFieldValue = parseFloat(splitArray[1]);
                        if (fromFieldValue !== null && toFieldValue !== null && (fromFieldValue < toFieldValue)) {
                            return value;
                        }
                        return helpers.error('string.validateRange', { value });
                    }
                }
            },
            htmlStrip: {
                validate(value, helpers, args, options) {
                    const clean = sanitize_html_1.default(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                    });
                    if (clean) {
                        return lodash_1.default.unescape(clean);
                    }
                    return helpers.error('string.htmlStrip', { value });
                }
            },
            validateDateRange: {
                validate(value, helpers, args, options) {
                    if (value && value.length && !joi_custom_input_rules_1.rangeDateFormatHypenYMD.test(value)) {
                        return helpers.error('string.validateDateRange', { value });
                    }
                    const splitArray = value.split(':');
                    const fromFieldValue = splitArray[0];
                    const toFieldValue = splitArray[1];
                    const isFromField = joi_custom_input_rules_1.dateFormatHypenYMD.test(splitArray[0]);
                    const isToField = joi_custom_input_rules_1.dateFormatHypenYMD.test(splitArray[1]);
                    // const isValidaDates = (new Date(fromFieldValue) < new Date(toFieldValue));
                    const isValidaDates = (new Date(fromFieldValue).getTime() <= new Date(toFieldValue).getTime());
                    if (fromFieldValue !== null && toFieldValue !== null && (isFromField && isToField) && isValidaDates) {
                        return value;
                    }
                    return helpers.error('string.validateDateRange.min', { value });
                }
            }
        }
    };
};
//# sourceMappingURL=joi-custom-types.custom.js.map