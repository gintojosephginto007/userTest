import _ from 'lodash';
import sanitizeHtml from 'sanitize-html';
import { dateFormatHypenYMD, rangeDateFormatHypenYMD, rangeFormat } from './joi-custom-input-rules';
export default (joi: any) => {
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
        validate(value: any, helpers: any, args: any, options: any) {
          const clean = _.unescape(value)
          if (clean) {
            return clean
          }

          return helpers.error('string.unescape', { value })
        }
      },
      sanetize: {
        validate(value: any, helpers: any, args: any, options: any) {
          const clean = value.replace(/[|&;$%@"<>()+,]/g, '')
          if (clean) {
            return clean
          }

          return helpers.error('string.sanetize', { value })
        }
      },
      capFirst: {
        validate(value: any, helpers: any, args: any, options: any) {
          const clean = _.startCase(_.toLower(value))
          if (clean) {
            return clean
          }
          return helpers.error('string.capFirst', { value })
        }
      },
      validMobile: {
        validate(value: string | any[], helpers: any, args: any, options: any) {
          if (value && value.length) {
            if (value.length > 10) {
              return value.slice(-10)
            }
            return value
          }
          return helpers.error('string.validMobile', { value })
        }
      },
      validateRange: {
        validate(value: any, helpers: any, args: any, options: any) {
          if (value && value.length && rangeFormat.test(value)) {
            const splitArray = value.split(':')
            const fromFieldValue = parseFloat(splitArray[0])
            const toFieldValue = parseFloat(splitArray[1])
            if (fromFieldValue !== null && toFieldValue !== null && (fromFieldValue < toFieldValue)) {
              return value
            }

            return helpers.error('string.validateRange', { value })
          }
        }
      },
      htmlStrip: {
        validate(value: any, helpers: any, args: any, options: any) {
          const clean = sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          });

          if (clean) {
            return _.unescape(clean);
          }

          return helpers.error('string.htmlStrip', { value })
        }
      },
      validateDateRange: {
        validate(value: any, helpers: any, args: any, options: any) {

          if (value && value.length && !rangeDateFormatHypenYMD.test(value)) {
            return helpers.error('string.validateDateRange', { value })
          }
          const splitArray = value.split(':')
          const fromFieldValue = splitArray[0];
          const toFieldValue = splitArray[1];
          const isFromField = dateFormatHypenYMD.test(splitArray[0]);
          const isToField = dateFormatHypenYMD.test(splitArray[1]);
          // const isValidaDates = (new Date(fromFieldValue) < new Date(toFieldValue));
          const isValidaDates = (new Date(fromFieldValue).getTime() <= new Date(toFieldValue).getTime());

          if (fromFieldValue !== null && toFieldValue !== null && (isFromField && isToField) && isValidaDates) {
            return value
          }
          return helpers.error('string.validateDateRange.min', { value })
        }
      }
    }
  }
}