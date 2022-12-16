import Joi from '@hapi/joi'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import _ from 'lodash'
export default (useJoiError = false, Schemas: {}) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put']

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    escapeHtml: true,
    stripUnknown: true // remove unknown keys from the validated data
  }

  // return the validation middleware
  return (req: Request, res: Response, next: NextFunction) => {
    const route = req.path
    const method = req.method.toLowerCase()
    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      // get schema for the current route
      const _schema: Joi.ObjectSchema = _.get(Schemas, route)
      if (_schema) {
        // Validate req.body using the schema and validation options
        const { error, value } = _schema.validate(req.body, _validationOptions)
        if (error) {
          if (req.isFile) {
            fs.unlinkSync(req.file.path)
          }
          // Joi Error
          const JoiError = {
            status: 'FAILURE',
            statusCode: 422,
            data: {},
            error: {
              // original: error._object,
              // fetch only message and type from each error
              details: _.uniqBy(_.map(error.details, ({ message, type, context }) => ({
                message: message.replace(/[""]/g, ''),
                key: context.key,
                // type,
              })), 'key')
            }
          }

          // Custom Error
          const CustomError = {
            data: {},
            statusCode: 422,
            status: 'FAILURE',
            error: 'Invalid request data. Please review request and try again.'
          }

          // Send back the JSON error response
          res.status(422).json(_useJoiError ? JoiError : CustomError)
        } else {
          // Replace req.body with the data after Joi validation
          req.body = value
          next()
        }
      }
    } else {
      next()
    }
  }
}
