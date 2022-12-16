"use strict";
exports.__esModule = true;
var mysql2_1 = require("mysql2");
var logger_1 = require("../../common/logger");
var config_1 = require("../config");
var pool = mysql2_1["default"].createPool({
    connectionLimit: config_1["default"].mysqlConnectionLimit,
    host: config_1["default"].mysqlHost,
    user: config_1["default"].mysqlUser,
    password: config_1["default"].mysqlPassword,
    database: config_1["default"].mysqlDatabase,
    charset: "utf8mb4",
    waitForConnections: true,
    queueLimit: config_1["default"].mysqlQueueLimit
});
pool.getConnection(function (err, connection) {
    if (err) {
        /* if (err.code === "ER_BAD_DB_ERROR") {
            databaseLogger.error(`${err}`);
        } */
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            logger_1.databaseLogger.error("Mysql master database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            logger_1.databaseLogger.error("Mysql master database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            logger_1.databaseLogger.error("Mysql master database connection was refused.");
        }
        if (err.code === "ETIMEDOUT") {
            logger_1.databaseLogger.error("Mysql master database connection timed out.");
        }
        logger_1.serverLogger.error("(Mysql master database Connection Error Code: " + err.code + ")--> " + err.message);
        return;
    }
    if (connection) {
        logger_1.serverLogger.info("Mysql master database connection established successfully.");
        connection.release();
    }
    return;
});
pool.on("release", function (connection) {
    // tslint:disable-next-line: no-console
    // databaseLogger.info("Connection %d released", connection.threadId);
});
pool.on("enqueue", function () {
    logger_1.databaseLogger.info("Waiting for available connection slot");
});
// const masterDb = pool;
exports["default"] = pool;
