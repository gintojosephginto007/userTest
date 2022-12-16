"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var path_1 = require("path");
exports["default"] = (function (fieldName) {
    var detailsError = { message: fieldName + " is required.", key: fieldName };
    return function (req, res, next) {
        try {
            var fileFilter = function (request, file, cb) {
                // accept image only
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    detailsError.message = 'Only image files are allowed!';
                    detailsError.key = fieldName;
                    return cb(detailsError, false);
                }
                cb(null, true);
            };
            var storage = multer_1["default"].diskStorage({
                // tslint:disable-next-line: no-shadowed-variable
                destination: function (req, file, callback) {
                    callback(null, 'assets/uploads/');
                },
                // tslint:disable-next-line: no-shadowed-variable
                filename: function (req, file, callback) {
                    var _a;
                    var fileName = file.fieldname + "_" + Date.now() + "_" + Math.random().toString(36).substring(7) + path_1["default"].extname(file.originalname);
                    var body = Object.assign((_a = {}, _a[fieldName] = fileName, _a), req.body);
                    req.body = body;
                    callback(null, fileName);
                }
            });
            var upload = multer_1["default"]({ storage: storage, fileFilter: fileFilter }).single(fieldName);
            upload(req, res, function (err) {
                var body = Object.assign({}, req.body);
                req.body = body;
                var isError;
                if (err instanceof multer_1["default"].MulterError) {
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
});
