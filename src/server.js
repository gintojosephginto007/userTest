"use strict";
exports.__esModule = true;
exports.Server = void 0;
var express_1 = require("express");
var path = require("path");
var logger_1 = require("./common/logger");
var error_1 = require("./common/middleware/error");
var config_1 = require("./config/config");
var routes_1 = require("./routes");
var Server = /** @class */ (function () {
    function Server(app) {
        this.app = app;
        this.initApp();
    }
    Server.prototype.start = function (port) {
        this.app.listen(port, function () { return logger_1.serverLogger.info("server started at http://localhost:" + port); });
    };
    Server.prototype.initApp = function () {
        process.on('uncaughtException', function (err) {
            logger_1.globalLogger.error('Uncaught Exception at:' + err.message, err);
            process.exit(1);
        });
        process.on('unhandledRejection', function (reason, promise) {
            logger_1.globalLogger.error('Unhandled Rejection at:' + reason);
            process.exit(1);
        });
        this.app.use(config_1["default"].fakeUploadFolderPath, express_1["default"].static(path.resolve(config_1["default"].uploadsDirectory)));
        this.app.disable('x-powered-by');
        this.app.use('/api', routes_1["default"]);
        /* this.app.get('/', (req, res) => {
          res.status(200).send({ message: 'Welcome to our restful API' })
        }) */
        /* this.app.get("/api", (req: Request, res: Response): void => {
              res.send("You have reached the API!");
          }); */
        this.app.get('*', function (req, res) {
            res.sendFile(path.resolve('./') + '/static/index.html');
        });
        this.app.use(error_1["default"]);
    };
    return Server;
}());
exports.Server = Server;
