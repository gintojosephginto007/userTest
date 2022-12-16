"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var path_1 = require("path");
// define multer storage configuration
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'assets/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + path_1["default"].extname(file.originalname));
    }
});
var upload = multer_1["default"]({ storage: storage });
exports["default"] = upload;
