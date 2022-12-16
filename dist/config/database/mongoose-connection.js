"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs = __importStar(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const path = __importStar(require("path"));
const logger_1 = require("../../common/logger");
const config_1 = __importDefault(require("../config"));
const uri = `mongodb://${config_1.default.mongoUsername}:${config_1.default.mongoPassword}@${config_1.default.mongoHost}:${config_1.default.mongoPort}/${config_1.default.mongoDb}?${config_1.default.mongoConnectionOption}`;
const db = config_1.default.mongoDb;
const certFileBuf = [fs.readFileSync(path.resolve('assets/config/', 'rds-combined-ca-bundle.pem'))];
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    sslValidate: true,
    sslCA: certFileBuf,
    promiseLibrary: global.Promise,
    poolSize: 10
};
class Database {
    static connect() {
        // mongoose.Promise = global.Promise;
        mongoose_1.default
            .connect(uri, options).then(() => {
            const { connection } = mongoose_1.default;
            logger_1.serverLogger.info('Mongodb database connection established Successfully');
            Database.monitor(connection);
        }).catch(error => logger_1.serverLogger.error('Mongodb database Connection Failed', error));
    }
    static monitor(connection) {
        connection.on('connected', () => logger_1.serverLogger.info('Mongodb database connection established Successfully'));
        connection.on('error', (err) => logger_1.serverLogger.error('Mongodb database Connection Failed: ' + err));
        connection.on('disconnected', () => logger_1.serverLogger.info('Mongodb database Connection Disconnected'));
        process.on('SIGINT', () => {
            connection.close();
            logger_1.serverLogger.error('Mongodb database Connection closed due to NodeJs process termination');
            // process.exit(0);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=mongoose-connection.js.map