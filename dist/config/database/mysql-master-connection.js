"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
// import { databaseLogger, serverLogger } from "../../common/logger";
const config_1 = __importDefault(require("../config"));
const pool = mysql2_1.default.createPool({
    connectionLimit: config_1.default.mysqlConnectionLimit,
    host: config_1.default.mysqlHost,
    user: config_1.default.mysqlUser,
    password: config_1.default.mysqlPassword,
    database: config_1.default.mysqlDatabase,
    charset: "utf8mb4",
    waitForConnections: true,
    queueLimit: config_1.default.mysqlQueueLimit,
    // rowsAsArray: true
    // Promise: bluebird,
    // debug: true
});
pool.getConnection((err, connection) => {
    if (err) {
        /* if (err.code === "ER_BAD_DB_ERROR") {
            databaseLogger.error(`${err}`);
        } */
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            // databaseLogger.error("Mysql master database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            // databaseLogger.error("Mysql master database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            // databaseLogger.error("Mysql master database connection was refused.");
        }
        if (err.code === "ETIMEDOUT") {
            // databaseLogger.error("Mysql master database connection timed out.");
        }
        // serverLogger.error(`(Mysql master database Connection Error Code: ${err.code})--> ${err.message}`);
        return;
    }
    if (connection) {
        // serverLogger.info("Mysql master database connection established successfully.");
        connection.release();
    }
    return;
});
pool.on("release", (connection) => {
    // tslint:disable-next-line: no-console
    // databaseLogger.info("Connection %d released", connection.threadId);
});
pool.on("enqueue", () => {
    // databaseLogger.info("Waiting for available connection slot");
});
// const masterDb = pool;
exports.default = pool;
//# sourceMappingURL=mysql-master-connection.js.map