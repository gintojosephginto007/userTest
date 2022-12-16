"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var path_1 = require("path");
var config_1 = require("../../config/config");
exports["default"] = (function (count, field, maxCount) {
    if (maxCount === void 0) { maxCount = 1; }
    var fields = [];
    fields.push({ name: field, maxCount: maxCount });
    var detailsError = { message: 'Multer Middleware', field: field };
    return function (req, res, next) {
        try {
            var fileFilter = function (request, file, cb) {
                // accept image only
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    detailsError.message = 'Only image files are allowed!';
                    detailsError.field = field;
                    return cb(detailsError, false);
                }
                cb(null, true);
            };
            var storage = multer_1["default"].diskStorage({
                // tslint:disable-next-line: no-shadowed-variable
                destination: function (req, file, callback) {
                    callback(null, config_1["default"].uploadsDirectory);
                },
                // tslint:disable-next-line: no-shadowed-variable
                filename: function (req, file, callback) {
                    var fileName = file.fieldname + "_" + Date.now() + "_" + Math.random().toString(36).substring(7) + path_1["default"].extname(file.originalname);
                    var body = Object.assign({ image: fileName }, req.body);
                    req.body = body;
                    callback(null, fileName);
                }
            });
            var upload = multer_1["default"]({ storage: storage, fileFilter: fileFilter }).fields(fields);
            upload(req, res, function (err) {
                var body = Object.assign({}, req.body);
                req.body = body;
                var isError;
                if (err instanceof multer_1["default"].MulterError) {
                    isError = true;
                    // A Multer error occurred when uploading.
                    detailsError.message = err.message;
                    detailsError.field = err.field;
                }
                else if (err) {
                    isError = true;
                    detailsError.message = err.message;
                    detailsError.field = field;
                }
                else if (!err) {
                    // throw new Error("Invalid Request for multer middleware");
                    next();
                    return;
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
                    });
                }
                // const body = Object.assign({}, req.body);
                // req.body = body;
                if (Object.keys(req.files).length) {
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
