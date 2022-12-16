"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var sanitize_html_1 = require("sanitize-html");
var joi_custom_input_rules_1 = require("./joi-custom-input-rules");
exports["default"] = (function (joi) {
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
                validate: function (value, helpers, args, options) {
                    var clean = lodash_1["default"].unescape(value);
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('string.unescape', { value: value });
                }
            },
            sanetize: {
                validate: function (value, helpers, args, options) {
                    var clean = value.replace(/[|&;$%@"<>()+,]/g, '');
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('string.sanetize', { value: value });
                }
            },
            capFirst: {
                validate: function (value, helpers, args, options) {
                    var clean = lodash_1["default"].startCase(lodash_1["default"].toLower(value));
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('string.capFirst', { value: value });
                }
            },
            validMobile: {
                validate: function (value, helpers, args, options) {
                    if (value && value.length) {
                        if (value.length > 10) {
                            return value.slice(-10);
                        }
                        return value;
                    }
                    return helpers.error('string.validMobile', { value: value });
                }
            },
            validateRange: {
                validate: function (value, helpers, args, options) {
                    if (value && value.length && joi_custom_input_rules_1.rangeFormat.test(value)) {
                        var splitArray = value.split(':');
                        var fromFieldValue = parseFloat(splitArray[0]);
                        var toFieldValue = parseFloat(splitArray[1]);
                        if (fromFieldValue !== null && toFieldValue !== null && (fromFieldValue < toFieldValue)) {
                            return value;
                        }
                        return helpers.error('string.validateRange', { value: value });
                    }
                }
            },
            htmlStrip: {
                validate: function (value, helpers, args, options) {
                    var clean = sanitize_html_1["default"](value, {
                        allowedTags: [],
                        allowedAttributes: {}
                    });
                    if (clean) {
                        return lodash_1["default"].unescape(clean);
                    }
                    return helpers.error('string.htmlStrip', { value: value });
                }
            },
            validateDateRange: {
                validate: function (value, helpers, args, options) {
                    if (value && value.length && !joi_custom_input_rules_1.rangeDateFormatHypenYMD.test(value)) {
                        return helpers.error('string.validateDateRange', { value: value });
                    }
                    var splitArray = value.split(':');
                    var fromFieldValue = splitArray[0];
                    var toFieldValue = splitArray[1];
                    var isFromField = joi_custom_input_rules_1.dateFormatHypenYMD.test(splitArray[0]);
                    var isToField = joi_custom_input_rules_1.dateFormatHypenYMD.test(splitArray[1]);
                    // const isValidaDates = (new Date(fromFieldValue) < new Date(toFieldValue));
                    var isValidaDates = (new Date(fromFieldValue).getTime() <= new Date(toFieldValue).getTime());
                    if (fromFieldValue !== null && toFieldValue !== null && (isFromField && isToField) && isValidaDates) {
                        return value;
                    }
                    return helpers.error('string.validateDateRange.min', { value: value });
                }
            }
        }
    };
});
