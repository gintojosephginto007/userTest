import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'

export default (fieldName: string) => {
  const detailsError = { message: `${fieldName} is required.`, key: fieldName }
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileFilter = (request: Request, file: Express.Multer.File, cb: CallableFunction) => {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          detailsError.message = 'Only image files are allowed!'
          detailsError.key = fieldName
          return cb(detailsError, false)
        }
        cb(null, true)
      }

      const storage = multer.diskStorage({
        // tslint:disable-next-line: no-shadowed-variable
        destination: (req, file, callback) => {
          callback(null, 'assets/uploads/')
        },
        // tslint:disable-next-line: no-shadowed-variable
        filename: (req, file, callback) => {
          const fileName = `${file.fieldname}_${Date.now()}_${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
          const body = Object.assign({ [fieldName]: fileName }, req.body);
          req.body = body;
          callback(null, fileName)
        }
      })
      const upload = multer({ storage, fileFilter }).single(fieldName);
      upload(req, res, (err: any) => {
        const body = Object.assign({}, req.body);
        req.body = body;
        let isError: boolean;
        if (err instanceof multer.MulterError) {
          isError = true;
          // A Multer error occurred when uploading.
          detailsError.message = err.message;
          detailsError.key = err.field;
        } else if (err) {
          isError = true;
          detailsError.message = err.message;
          detailsError.key = fieldName;
        }
        /*  else if (!req.file) {
          isError = true;
        } */

        if (isError) {
          return res.status(422).json({
            statusCode: 422,
            status: 'FAILURE',
            data: {},
            error: {
              // original: req.body,
              message: '',
              details: [detailsError]
            }
          });
        }

        if (req.file) {
          req.isFile = true;
        }

        next();
      })
    } catch (error) {
      next(error)
    }
    // next();
  }
}
