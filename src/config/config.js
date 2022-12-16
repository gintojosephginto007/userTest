"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var fs_1 = require("fs");
dotenv_1["default"].config();
if (!fs_1["default"].existsSync('.env')) {
    // tslint:disable-next-line: no-console
    console.error('.env file not exists.');
    process.exit(1);
}
exports["default"] = {
    // App environment
    appEnvironment: process.env.NODE_ENV,
    // App Details
    port: process.env.PORT,
    appName: process.env.APP_NAME,
    // Default Details
    fakeUploadFolderPath: process.env.FAKE_UPLOAD_FOLDER_PATH || '/uploads/',
    uploadsDirectory: process.env.UPLOADS_DIRECTORY || 'assets/uploads/',
    logsDirectory: process.env.LOGS_DIRECTORY || 'assets/logs/',
    configDirectory: process.env.CONFIG_DIRECTORY || 'assets/config/',
    permission: process.env.PERMISSION || '0755',
    downloadsDirectory: process.env.DOWNLOADS_DIRECTORY || 'assets/downloads/',
    // MySQL .cnf files location
    mysqlMasterCnf: './assets/config/master.cnf',
    mysqlSlaveCnf: './assets/config/slave.cnf',
    // Localization
    localizationLanguage: process.env.LOCALIZATION_LANGUAGE || 'en_US',
    contactUsAdminEmail: process.env.CONTACT_US_EMAIL,
    // server console logger enable or disabled
    loggerIsEnabled: (process.env.LOGGER_IS_ENABLED && parseInt(process.env.LOGGER_IS_ENABLED, 10) === 1) ? true : process.env.NODE_ENV !== 'prod' ? true : false,
    isSMSEnabled: (process.env.SMS_IS_ENABLED && parseInt(process.env.SMS_IS_ENABLED, 10) === 1) ? true : false,
    isDebugDataTable: (process.env.IS_DEBUG_DATA_TABLE && parseInt(process.env.IS_DEBUG_DATA_TABLE, 10) === 1) ? true : false,
    // AWS Configurations
    /* credentials */
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecreteAccessKey: process.env.AWS_SECRETE_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    /* Mailing */
    /* App Version */
    awsS3AppVersion: process.env.AWS_S3_APP_VERSION,
    awsSNSAppVersion: process.env.AWS_SNS_APP_VERSION,
    awsSESAppVersion: process.env.AWS_SES_APP_VERSION,
    // MySQL Details
    mysqlConnectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT, 10),
    mysqlHost: process.env.MYSQL_HOST,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlDatabase: process.env.MYSQL_DATABASE,
    mysqlQueueLimit: parseInt(process.env.MYSQL_QUEUE_LIMIT, 10),
    // MYSQL HASH KEY
    mysqlHashKey: process.env.MYSQL_HASH_KEY,
    // MYSQL OTHER DATABASES
    mysqlDatabaseNotifications: process.env.MYSQL_DATABASE_NOTIFICATIONS,
    // MySQL Read Replica Details
    mysqlReadConnectionLimit: parseInt(process.env.MYSQL_READ_CONNECTION_LIMIT, 10),
    mysqlReadHost: process.env.MYSQL_READ_HOST,
    mysqlReadUser: process.env.MYSQL_READ_USER,
    mysqlReadPassword: process.env.MYSQL_READ_PASSWORD,
    mysqlReadDatabase: process.env.MYSQL_READ_DATABASE,
    mysqlReadQueueLimit: parseInt(process.env.MYSQL_READ_QUEUE_LIMIT, 10)
};
