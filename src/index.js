"use strict";
exports.__esModule = true;
/**
 * Required External Modules
 */
var cors_1 = require("cors");
var express_1 = require("express");
var helmet_1 = require("helmet");
var error_1 = require("./common/middleware/error");
require("./config");
var config_1 = require("./config/config");
// import './modules/cron/cron.controller';
var server_1 = require("./server");
// dotenv.config();
/**
 * App Variables
 */
if (!config_1["default"].port) {
    process.exit(1);
}
var PORT = parseInt(config_1["default"].port, 10);
var app = express_1["default"]();
/**
 *  App Configuration
 */
app.use(helmet_1["default"]());
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(error_1["default"]);
/**
 * Server Activation
 */
var server = new server_1.Server(app);
server.start(PORT);
