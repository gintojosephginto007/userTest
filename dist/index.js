"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules
 */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const error_1 = __importDefault(require("./common/middleware/error"));
require("./config");
const config_1 = __importDefault(require("./config/config"));
// import './modules/cron/cron.controller';
const server_1 = require("./server");
// dotenv.config();
/**
 * App Variables
 */
if (!config_1.default.port) {
    process.exit(1);
}
const PORT = parseInt(config_1.default.port, 10);
const app = express_1.default();
/**
 *  App Configuration
 */
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(error_1.default);
/**
 * Server Activation
 */
const server = new server_1.Server(app);
server.start(PORT);
//# sourceMappingURL=index.js.map