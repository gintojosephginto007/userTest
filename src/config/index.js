"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var config_1 = require("./config");
var uploadsDirectory = config_1["default"].uploadsDirectory;
var logsDirectory = config_1["default"].logsDirectory;
var configDirectory = config_1["default"].configDirectory;
var downloadsDirectory = config_1["default"].downloadsDirectory;
var permission = config_1["default"].permission;
if (!fs_1["default"].existsSync(logsDirectory)) {
    fs_1["default"].mkdirSync(logsDirectory, permission);
}
if (!fs_1["default"].existsSync(uploadsDirectory)) {
    fs_1["default"].mkdirSync(uploadsDirectory, permission);
}
if (!fs_1["default"].existsSync(configDirectory)) {
    fs_1["default"].mkdirSync(configDirectory, permission);
}
if (!fs_1["default"].existsSync(downloadsDirectory)) {
    fs_1["default"].mkdirSync(downloadsDirectory, permission);
}
// MySQL .cnf files
var masterCnf = "[mysql]\nhost=" + process.env.MYSQL_HOST + "\nuser=" + process.env.MYSQL_USER + "\npassword=" + process.env.MYSQL_PASSWORD + "\ndatabase=" + process.env.MYSQL_DATABASE;
var slaveCnf = "[mysql]\nhost=" + process.env.MYSQL_READ_HOST + "\nuser=" + process.env.MYSQL_READ_USER + "\npassword=" + process.env.MYSQL_READ_PASSWORD + "\ndatabase=" + process.env.MYSQL_READ_DATABASE;
fs_1["default"].writeFile(config_1["default"].mysqlMasterCnf, masterCnf, { flag: 'wx' }, function (err) {
    if (err) {
        return;
    }
    ;
});
fs_1["default"].writeFile(config_1["default"].mysqlSlaveCnf, slaveCnf, { flag: 'wx' }, function (err) {
    if (err) {
        return;
    }
    ;
});
