"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.databaseLogger = exports.notificationLogger = exports.serverLogger = exports.cronLogger = exports.emailLogger = exports.smsLogger = exports.globalLogger = void 0;
var winston_1 = require("winston");
var winston_daily_rotate_file_1 = require("winston-daily-rotate-file");
var config_1 = require("../../config/config");
// const env = process.env.NODE_ENV || 'development';
// const level = env === 'development' ? 'debug' : 'info';
var logsDirectory = config_1["default"].logsDirectory || 'assets/logs/';
var winstonCommonOptions = {
    //  level,
    format: winston_1["default"].format.combine(winston_1["default"].format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1["default"].format.json()),
    exitOnError: false
};
var dailyRotateFileOptions = {
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 3,
    colorize: false,
    datePattern: 'YYYY_MM_DD'
};
var serverOptions = __assign({ filename: logsDirectory + "/%DATE%_server.log" }, dailyRotateFileOptions);
var globalOptions = __assign({ filename: logsDirectory + "/%DATE%_global.log" }, dailyRotateFileOptions);
var smsOptions = __assign({ filename: logsDirectory + "/%DATE%_sms.log" }, dailyRotateFileOptions);
var mongoOptions = __assign({ filename: logsDirectory + "/%DATE%_mongo.log" }, dailyRotateFileOptions);
// const mysqlOptions = {
//     filename: `${logsDirectory}/%DATE%_mysql.log`,
//     ...dailyRotateFileOptions
// };
var emailOptions = __assign({ filename: logsDirectory + "/%DATE%_email.log" }, dailyRotateFileOptions);
var cronOptions = __assign({ filename: logsDirectory + "/%DATE%_cron.log" }, dailyRotateFileOptions);
var notificationOptions = __assign({ filename: logsDirectory + "/%DATE%_notificaton.log" }, dailyRotateFileOptions);
var databaseOptions = __assign({ filename: logsDirectory + "/%DATE%_database.log" }, dailyRotateFileOptions);
var serverLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: [
        new winston_daily_rotate_file_1["default"](serverOptions),
    ] }));
exports.serverLogger = serverLogger;
var globalLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: [
        new winston_daily_rotate_file_1["default"](globalOptions),
    ] }));
exports.globalLogger = globalLogger;
var smsLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: new winston_daily_rotate_file_1["default"](smsOptions) }));
exports.smsLogger = smsLogger;
// const mongoLogger = winston.createLogger({
//     ...winstonCommonOptions,
//     transports: new DailyRotateFile(mongoOptions)
// });
// const mysqlLogger = winston.createLogger({
//     ...winstonCommonOptions,
//     transports: new DailyRotateFile(mysqlOptions)
// });
var emailLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: new winston_daily_rotate_file_1["default"](emailOptions) }));
exports.emailLogger = emailLogger;
var databaseLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: new winston_daily_rotate_file_1["default"](databaseOptions) }));
exports.databaseLogger = databaseLogger;
var cronLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: new winston_daily_rotate_file_1["default"](cronOptions) }));
exports.cronLogger = cronLogger;
var notificationLogger = winston_1["default"].createLogger(__assign(__assign({}, winstonCommonOptions), { transports: new winston_daily_rotate_file_1["default"](notificationOptions) }));
exports.notificationLogger = notificationLogger;
var console = new winston_1["default"].transports.Console();
serverLogger.add(console);
if (config_1["default"].loggerIsEnabled) {
    globalLogger.add(console);
    smsLogger.add(console);
    // mongoLogger.add(console);
    // mysqlLogger.add(console);
    emailLogger.add(console);
    cronLogger.add(console);
    notificationLogger.add(console);
    databaseLogger.add(console);
}
