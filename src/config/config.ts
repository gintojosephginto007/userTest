import dotenv from "dotenv";
import fs from 'fs';
dotenv.config();

if (!fs.existsSync('.env')) {
    // tslint:disable-next-line: no-console
    console.error('.env file not exists.');
    process.exit(1);
}

export default {
    // App environment
    appEnvironment: process.env.NODE_ENV,
    // App Details
    port: process.env.PORT,
    appName: process.env.APP_NAME,
    localizationLanguage: process.env.LOCALIZATION_LANGUAGE || 'en_US',
    mysqlConnectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT as string, 10),
    mysqlHost: process.env.MYSQL_HOST,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlDatabase: process.env.MYSQL_DATABASE,
    mysqlQueueLimit: parseInt(process.env.MYSQL_QUEUE_LIMIT as string, 10),
    // MYSQL HASH KEY
    mysqlHashKey: process.env.MYSQL_HASH_KEY,

    mysqlReadQueueLimit: parseInt(process.env.MYSQL_READ_QUEUE_LIMIT as string, 10),

};

