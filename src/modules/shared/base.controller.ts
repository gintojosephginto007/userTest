import { Response } from 'express';
import _ from 'lodash';
import { databaseLogger, globalLogger } from "../../common/logger";
import { IApiResponse} from '../../common/models/api-response.interface';
import { ISqlExcuteParams } from '../../common/models/sql-excute.interface';
// import fcm from "../../config/firebase/fcm";
import i18n from '../../config/i18n';
import BaseRepository from "./base.repository";
import DataTableController from "./data-table.controller";
const baseRepository = new BaseRepository();
export default class BaseController extends DataTableController {
  protected getLoginError(params: any) {
    return {
      status: 'FAILURE',
      statusCode: 422,
      data: {},
      error: {
        // original: params,
        message: "",
        details: [
          {
            message: 'Invalid username or password',
            key: 'password'
          }
        ]
      }
    }
  }

  protected setError({ response, params }: { response: Response; params: any; }) {
    return response.status(422).json(this.getLoginError(params))
  }

  protected setResponse({ response, msgType, statusFlag, statusCode, message, data, error }: IApiResponse) {
    try {

      /* if (msgType) {
        let translatedMessage = i18n.__(msgType);
        if (translatedMessage === msgType) {
          globalLogger.error('Translated Message Missing', { msgType });
          translatedMessage = message;
        }
        message = translatedMessage || message;
        if (data && data?.message) {
          data.message = translatedMessage;
        }
        if (error?.message) {
          error.message = translatedMessage;
        } else if (error?.details?.[0]) {
          error.details[0].message = translatedMessage;
        } else {
          error = translatedMessage;
        }
      } */

      if (msgType !== undefined) {
        const translatedMessage = i18n.__(msgType);

        if (translatedMessage !== msgType) {
          message = translatedMessage;
          if (data != null && data !== undefined) {
            if (data.message !== null) {
              data.message = translatedMessage;
            }

            if (error !== null && error !== undefined) {
              if (error.details !== null && Array.isArray(error.details) && error.details.length) {
                if (error.details[0] !== null && error.details[0] !== undefined) {
                  if (error.details[0].message !== null) { error.details[0].message = translatedMessage; }
                }
              } else if (error.message !== null && error !== undefined) {
                error.message = translatedMessage;
              } else { error = translatedMessage; }
            }
          }
        }
      }

      if (statusCode && statusCode > 200) {
        globalLogger.log('error', `server error: ${message}`, { statusCode, statusFlag, error, path: response.path, body: response.body });
        if (statusCode >= 500) {
          databaseLogger.log('error', `Database error: ${message}`, { statusCode, statusFlag, error, path: response.path, body: response.body });
          statusCode = 500;
          statusFlag = false;
          message = i18n.__('went_wrong');
        }
      }

      statusCode = statusCode < 200 ? statusCode = 200 : statusCode;
      data = statusFlag ? { 'message': message, ...data } : {};
      error = !statusFlag ? error ? error : { message, details: [] } : { 'message': '', details: [] };
      const status = statusFlag ? 'SUCCESS' : 'FAILURE';
      response.status(statusCode).json({
        status,
        statusCode,
        data,
        error
      });
    } catch (error) {
      globalLogger.info(`server error: setResponse catch Error`, { msgType, statusFlag, statusCode, message, data, error });
      statusCode = 500;
      status = 'FAILURE';
      data = {};
      error = { 'message': i18n.__('went_wrong'), details: [] };

      response.status(statusCode).json({
        status,
        statusCode,
        data,
        error
      });
    }


  }

  protected excuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams) {
    return baseRepository.excuteQuery({ sqlQuery, params, isSingle });
  }

}
