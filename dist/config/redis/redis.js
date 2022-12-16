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
const redis = __importStar(require("redis"));
const logger_1 = require("../../common/logger");
const config_1 = __importDefault(require("../config"));
const port = parseInt(config_1.default.redisPort, 10);
const host = config_1.default.redisHost;
const password = config_1.default.redisPassword;
// const client = redis.createClient(6379,'localhost');     // Without Password
const client = redis.createClient(port, host); // With Password
if (password) {
    client.auth(password);
}
client.on('connect', () => {
    logger_1.serverLogger.info(`Redis Connected Successfully at: ${host}`);
});
client.on("error", (err) => {
    logger_1.serverLogger.error({ message: 'Redis Connectivity Error ' + err.message, error: err });
});
exports.default = client;
//# sourceMappingURL=redis.js.map