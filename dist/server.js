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
exports.Server = void 0;
const path = __importStar(require("path"));
const logger_1 = require("./common/logger");
const error_1 = __importDefault(require("./common/middleware/error"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor(app) {
        this.app = app;
        this.initApp();
    }
    start(port) {
        this.app.listen(port, () => logger_1.serverLogger.info(`server started at http://localhost:${port}`));
    }
    initApp() {
        process.on('uncaughtException', (err) => {
            logger_1.globalLogger.error('Uncaught Exception at:' + err.message, err);
            process.exit(1);
        });
        process.on('unhandledRejection', (reason, promise) => {
            logger_1.globalLogger.error('Unhandled Rejection at:' + reason);
            process.exit(1);
        });
        this.app.disable('x-powered-by');
        this.app.use('', routes_1.default);
        /* this.app.get('/', (req, res) => {
          res.status(200).send({ message: 'Welcome to our restful API' })
        }) */
        /* this.app.get("/api", (req: Request, res: Response): void => {
              res.send("You have reached the API!");
          }); */
        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve('./') + '/static/index.html');
        });
        this.app.use(error_1.default);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map