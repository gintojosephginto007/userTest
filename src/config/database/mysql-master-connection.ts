import mysql from "mysql2";
// import { databaseLogger, serverLogger } from "../../common/logger";
import config from "../config";

const pool = mysql.createPool({
    connectionLimit: config.mysqlConnectionLimit,
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase,
    charset: "utf8mb4",
    waitForConnections: true,
    queueLimit: config.mysqlQueueLimit,
    // rowsAsArray: true
    // Promise: bluebird,
    // debug: true
});

pool.getConnection((err: NodeJS.ErrnoException, connection: mysql.PoolConnection) => {
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
export default pool;
