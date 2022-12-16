import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import config from '../../config/config'
export default (count: 'single' | 'multiple', field: string, maxCount: number = 1) => {
  const fields: any[] = []
  fields.push({ name: field, maxCount })
  const detailsError = { message: 'Multer Middleware', field }
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileFilter = (request: Request, file: Express.Multer.File, cb: CallableFunction) => {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          detailsError.message = 'Only image files are allowed!'
          detailsError.field = field
          return cb(detailsError, false)
        }
        cb(null, true)
      }

      const storage = multer.diskStorage({
        // tslint:disable-next-line: no-shadowed-variable
        destination: (req, file, callback) => {
          callback(null, null)
        },
        // tslint:disable-next-line: no-shadowed-variable
        filename: (req, file, callback) => {
          const fileName = `${file.fieldname}_${Date.now()}_${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`
          const body = Object.assign({ image: fileName }, req.body)
          req.body = body
          callback(null, fileName)
        }
      })
      const upload = multer({ storage, fileFilter }).fields(fields)
      upload(req, res, (err: any) => {
        const body = Object.assign({}, req.body)
        req.body = body
        let isError: boolean
        if (err instanceof multer.MulterError) {
          isError = true
          // A Multer error occurred when uploading.
          detailsError.message = err.message
          detailsError.field = err.field
        } else if (err) {
          isError = true
          detailsError.message = err.message
          detailsError.field = field
        } else if (!err) {
          // throw new Error("Invalid Request for multer middleware");
          next()
          return
        }

        if (isError) {
          return res.status(422).json({
            status: 'FAILURE',
            data: {},
            error: {
              // original: req.body,
              message: '',
              details: [detailsError]
            }
          })
        }

        // const body = Object.assign({}, req.body);
        // req.body = body;
        if (Object.keys(req.files).length) {
          req.isFile = true
        }

        next()
      })
    } catch (error) {
      next(error)
    }
    // next();
  }
}
