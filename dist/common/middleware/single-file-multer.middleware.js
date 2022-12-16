"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.default = (fieldName) => {
    const detailsError = { message: `${fieldName} is required.`, key: fieldName };
    return (req, res, next) => {
        try {
            const fileFilter = (request, file, cb) => {
                // accept image only
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    detailsError.message = 'Only image files are allowed!';
                    detailsError.key = fieldName;
                    return cb(detailsError, false);
                }
                cb(null, true);
            };
            const storage = multer_1.default.diskStorage({
                // tslint:disable-next-line: no-shadowed-variable
                destination: (req, file, callback) => {
                    callback(null, 'assets/uploads/');
                },
                // tslint:disable-next-line: no-shadowed-variable
                filename: (req, file, callback) => {
                    const fileName = `${file.fieldname}_${Date.now()}_${Math.random().toString(36).substring(7)}${path_1.default.extname(file.originalname)}`;
                    const body = Object.assign({ [fieldName]: fileName }, req.body);
                    req.body = body;
                    callback(null, fileName);
                }
            });
            const upload = multer_1.default({ storage, fileFilter }).single(fieldName);
            upload(req, res, (err) => {
                const body = Object.assign({}, req.body);
                req.body = body;
                let isError;
                if (err instanceof multer_1.default.MulterError) {
                    isError = true;
                    // A Multer error occurred when uploading.
                    detailsError.message = err.message;
                    detailsError.key = err.field;
                }
                else if (err) {
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
            });
        }
        catch (error) {
            next(error);
        }
        // next();
    };
};
//# sourceMappingURL=single-file-multer.middleware.js.map