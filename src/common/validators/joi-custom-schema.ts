import BaseJoi from '@hapi/joi';
import { dateFormatHypenYMD, dateFormatSlashYMD, mobileRegex, pinCodeRegix } from './joi-custom-input-rules';
import customType from './joi-custom-types.custom';
const Joi = BaseJoi.extend(customType);

export const StringInput = Joi.string().trim().htmlStrip(); // .unescape();
export const NumberInput = Joi.number().positive().integer();
export const CapFirstLetter = StringInput.capFirst();
export const ValidateRange = StringInput.validateRange();
export const RangeAlternatives = Joi.alternatives().try(Joi.number().positive(), ValidateRange);

const stringRequirdMessage = 'is required.';
export const stringOptions = {
  messages: {
    string: {
      regex: {
        base: stringRequirdMessage
      },
      base: stringRequirdMessage
    }
  }
}

export const numberOptions = {
  messages: {
    number: {
      base: 'is required.'
    },
    any: {
      allowOnly: 'invalid'
    }
  }
}
// "string.pattern.base": "Please enter a valid numeric PIN."

export const inputDateSlashYMD = StringInput
  .pattern(new RegExp(dateFormatSlashYMD))
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

export const inputDateHypenYMD = StringInput
  .pattern(new RegExp(dateFormatHypenYMD))
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

export const ValidateDateRange = StringInput.validateDateRange();
export const DateRangeAlternatives = Joi
.alternatives()
.try(inputDateHypenYMD, ValidateDateRange)
.options({
  messages:{
    // "alternatives.match": "Invalid {{#label}} range format."
    "es_ES": {
      "alternatives.match": "Formato de rango de {{#label}} no válido."
    },
    "en_US": {
      "alternatives.match": "Invalid {{#label}} range format."
    }
  }
});
export const tableDefaultParams = {
  pageNumber: NumberInput.options(numberOptions),
  pageSize: NumberInput.options(numberOptions),
  sortField: StringInput.allow(''),
  sortOrder: StringInput.lowercase().allow('')
}
