"use strict";
exports.__esModule = true;
exports.tableDefaultParams = exports.DateRangeAlternatives = exports.ValidateDateRange = exports.inputDateHypenYMD = exports.inputDateSlashYMD = exports.numberOptions = exports.stringOptions = exports.RangeAlternatives = exports.ValidateRange = exports.CapFirstLetter = exports.NumberInput = exports.StringInput = void 0;
var joi_1 = require("@hapi/joi");
var joi_custom_input_rules_1 = require("./joi-custom-input-rules");
var joi_custom_types_custom_1 = require("./joi-custom-types.custom");
var Joi = joi_1["default"].extend(joi_custom_types_custom_1["default"]);
exports.StringInput = Joi.string().trim().htmlStrip(); // .unescape();
exports.NumberInput = Joi.number().positive().integer();
exports.CapFirstLetter = exports.StringInput.capFirst();
exports.ValidateRange = exports.StringInput.validateRange();
exports.RangeAlternatives = Joi.alternatives()["try"](Joi.number().positive(), exports.ValidateRange);
var stringRequirdMessage = 'is required.';
exports.stringOptions = {
    messages: {
        string: {
            regex: {
                base: stringRequirdMessage
            },
            base: stringRequirdMessage
        }
    }
};
exports.numberOptions = {
    messages: {
        number: {
            base: 'is required.'
        },
        any: {
            allowOnly: 'invalid'
        }
    }
};
// "string.pattern.base": "Please enter a valid numeric PIN."
exports.inputDateSlashYMD = exports.StringInput
    .pattern(new RegExp(joi_custom_input_rules_1.dateFormatSlashYMD))
    .options({
    messages: {
        // "string.pattern.base": "{{#label}} should be a date."
        "es_ES": {
            "string.pattern.base": "{{#label}} debería ser una fecha."
        },
        "en_US": {
            "string.pattern.base": "{{#label}} should be a date."
        }
    }
});
exports.inputDateHypenYMD = exports.StringInput
    .pattern(new RegExp(joi_custom_input_rules_1.dateFormatHypenYMD))
    .options({
    messages: {
        // "string.pattern.base": "{{#label}} should be a date."
        "es_ES": {
            "string.pattern.base": "{{#label}} debería ser una fecha."
        },
        "en_US": {
            "string.pattern.base": "{{#label}} should be a date."
        }
    }
});
exports.ValidateDateRange = exports.StringInput.validateDateRange();
exports.DateRangeAlternatives = Joi
    .alternatives()["try"](exports.inputDateHypenYMD, exports.ValidateDateRange)
    .options({
    messages: {
        // "alternatives.match": "Invalid {{#label}} range format."
        "es_ES": {
            "alternatives.match": "Formato de rango de {{#label}} no válido."
        },
        "en_US": {
            "alternatives.match": "Invalid {{#label}} range format."
        }
    }
});
exports.tableDefaultParams = {
    pageNumber: exports.NumberInput.options(exports.numberOptions),
    pageSize: exports.NumberInput.options(exports.numberOptions),
    sortField: exports.StringInput.allow(''),
    sortOrder: exports.StringInput.lowercase().allow('')
};
