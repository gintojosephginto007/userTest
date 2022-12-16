import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../../config/config';
// const env = process.env.NODE_ENV || 'development';
// const level = env === 'development' ? 'debug' : 'info';
const logsDirectory =  'assets/logs/';

const winstonCommonOptions = {
    //  level,
    format: winston.format.combine(
        winston.format.timestamp(
            {
                format: 'YYYY-MM-DD HH:mm:ss'
            }
        ),
        winston.format.json()
    ),
    exitOnError: false, // do not exit on handled exceptions
}

const dailyRotateFileOptions = {
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 3,
    colorize: false,
    datePattern: 'YYYY_MM_DD'
}

const serverOptions = {
    filename: `${logsDirectory}/%DATE%_server.log`,
    ...dailyRotateFileOptions
};

const globalOptions = {
    filename: `${logsDirectory}/%DATE%_global.log`,
    ...dailyRotateFileOptions
};

const databaseOptions = {
    filename: `${logsDirectory}/%DATE%_database.log`,
    ...dailyRotateFileOptions
};

const serverLogger = winston.createLogger({
    ...winstonCommonOptions,
    transports: [
        new DailyRotateFile(serverOptions),
    ]
});

const globalLogger = winston.createLogger({
    ...winstonCommonOptions,
    transports: [
        new DailyRotateFile(globalOptions),
    ]
});


const databaseLogger = winston.createLogger({
    ...winstonCommonOptions,
    transports: new DailyRotateFile(databaseOptions),
});


const console = new winston.transports.Console();
serverLogger.add(console);


export {
    globalLogger,
    serverLogger,
    databaseLogger
};
