"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// define multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'assets/uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}_${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = multer_1.default({ storage });
exports.default = upload;
//# sourceMappingURL=multer.middleware.js.map