import { NextFunction, Request, Response } from 'express'
import { globalLogger } from '../logger';
class JSONParseError extends SyntaxError {
  public status: number;
}
export default (err: JSONParseError, req: Request, res: Response, next: NextFunction) => {
  globalLogger.log('error', err.message, { error: err, path: req.path, body: req.body });
  let responseStatus = 500;
  let jsonResponse = {
    data: {},
    error: {},
    message: 'Something went wrong.',
    status: 'FAILURE',
    statusCode: responseStatus
  };
  if (err as JSONParseError instanceof SyntaxError && err.status === 400) {
    responseStatus = 400;
    jsonResponse = {
      ...jsonResponse,
      error: {
        code: 'INVALID_JSON',
        message: 'The body of your request is not valid JSON.'
      },
      statusCode: responseStatus
    };
  }
  return res.status(responseStatus).json(jsonResponse)
}
