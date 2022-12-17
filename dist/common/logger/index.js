"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// const env = process.env.NODE_ENV || 'development';
// const level = env === 'development' ? 'debug' : 'info';
const logsDirectory = 'assets/logs/';
const winstonCommonOptions = {
    //  level,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.default.format.json()),
    exitOnError: false, // do not exit on handled exceptions
};
const dailyRotateFileOptions = {
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 3,
    colorize: false,
    datePattern: 'YYYY_MM_DD'
};
//# sourceMappingURL=index.js.map