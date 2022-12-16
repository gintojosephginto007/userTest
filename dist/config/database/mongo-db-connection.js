"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
const uri = `mongodb://${config_1.default.mongoUsername}:${config_1.default.mongoPassword}@${config_1.default.mongoHost}:${config_1.default.mongoPort}/${config_1.default.mongoDb}?${config_1.default.mongoConnectionOption}`;
const db = config_1.default.mongoDb;
const options = {
    useUnifiedTopology: true,
    // promiseLibrary: global.Promise,
    poolSize: 10
};
class MongoHelper {
    static db(dbName) {
        if (!MongoHelper.client) {
            throw new Error('Mongodb connection not availiable. Call connect first!');
        }
        if (!dbName) {
            dbName = db;
        }
        return MongoHelper.client.db(dbName);
    }
    static monitor(client) {
        client.on('serverOpening', event => {
            // tslint:disable-next-line: no-console
            console.log('received serverOpening');
            // tslint:disable-next-line: no-console
            // console.log(JSON.stringify(event, null, 2));
        });
        /* // tslint:disable-next-line: no-console
        client.on('connectionPoolCreated', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionPoolClosed', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionCreated', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionReady', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionClosed', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionCheckOutStarted', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionCheckOutFailed', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionCheckedOut', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionCheckedIn', event => console.dir(event));
        // tslint:disable-next-line: no-console
        client.on('connectionPoolCleared', event => console.dir(event)); */
    }
}
exports.MongoHelper = MongoHelper;
MongoHelper.client = null;
MongoHelper.connect = () => new Promise((resolve, reject) => {
    /*  MongoClient.connect(uri, options, (err, client) => {
         if (err) { reject(err); return; };
         MongoHelper.client = client;
         resolve(client);
     }); */
    const client = new mongodb_1.MongoClient(uri, options);
    MongoHelper.monitor(client);
    client.connect((err, clientO) => {
        if (err) {
            reject(err);
            return;
        }
        ;
        MongoHelper.client = clientO;
        resolve(clientO);
    });
});
//# sourceMappingURL=mongo-db-connection.js.map