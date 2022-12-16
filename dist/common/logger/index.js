"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseLogger = exports.serverLogger = exports.globalLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
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
const serverOptions = Object.assign({ filename: `${logsDirectory}/%DATE%_server.log` }, dailyRotateFileOptions);
const globalOptions = Object.assign({ filename: `${logsDirectory}/%DATE%_global.log` }, dailyRotateFileOptions);
const databaseOptions = Object.assign({ filename: `${logsDirectory}/%DATE%_database.log` }, dailyRotateFileOptions);
const serverLogger = winston_1.default.createLogger(Object.assign(Object.assign({}, winstonCommonOptions), { transports: [
        new winston_daily_rotate_file_1.default(serverOptions),
    ] }));
exports.serverLogger = serverLogger;
const globalLogger = winston_1.default.createLogger(Object.assign(Object.assign({}, winstonCommonOptions), { transports: [
        new winston_daily_rotate_file_1.default(globalOptions),
    ] }));
exports.globalLogger = globalLogger;
const databaseLogger = winston_1.default.createLogger(Object.assign(Object.assign({}, winstonCommonOptions), { transports: new winston_daily_rotate_file_1.default(databaseOptions) }));
exports.databaseLogger = databaseLogger;
const console = new winston_1.default.transports.Console();
serverLogger.add(console);
//# sourceMappingURL=index.js.map