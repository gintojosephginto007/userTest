"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("./redis"));
const config_1 = __importDefault(require("../config"));
class RedisCache {
    setDataExDays(key, days = 1, data) {
        redis_1.default.select(0, (err, res) => {
            // tslint:disable-next-line: no-console
            console.log(res);
        });
        return new Promise((resolve, reject) => {
            if (!config_1.default.redisIsEnabled) {
                return resolve();
            }
            redis_1.default.set(key, JSON.stringify(data), (err, reply) => {
                if (err) {
                    return reject(err);
                }
                redis_1.default.expire(key, 3600 * 24 * days); // day wise expiry
                resolve();
            });
        });
    }
    setDataExMins(key, mins = 1, data) {
        redis_1.default.select(0, (err, res) => {
            // tslint:disable-next-line: no-console
            console.log(res);
        });
        return new Promise((resolve, reject) => {
            if (!config_1.default.redisIsEnabled) {
                return resolve();
            }
            redis_1.default.set(key, JSON.stringify(data), (err, reply) => {
                if (err) {
                    return reject(err);
                }
                redis_1.default.expire(key, 60 * mins); // minutes wise expiry
                resolve();
            });
        });
    }
    getData(key) {
        redis_1.default.select(0, (err, res) => {
            // tslint:disable-next-line: no-console
            console.log(res);
        });
        return new Promise((resolve, reject) => {
            redis_1.default.get(key, (err, data) => {
                if (err) {
                    return reject(err);
                }
                if (data != null) {
                    resolve(JSON.parse(data));
                }
                resolve(null);
            });
        });
    }
    clearCacheData(keyPrefix) {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line: no-console
            console.log("clearing redis with key:-", keyPrefix);
            redis_1.default.select(0, (err, res) => {
                // tslint:disable-next-line: no-console
                console.log(res);
            });
            return new Promise((resolve, reject) => {
                redis_1.default.keys(keyPrefix, (error, keysData) => {
                    if (error) {
                        // tslint:disable-next-line: no-console
                        console.log(error);
                        return reject(error);
                    }
                    // tslint:disable-next-line: no-console
                    console.log(keysData);
                    if (keysData) {
                        for (const keyword of keysData) {
                            // tslint:disable-next-line: no-console
                            console.log(keyword);
                            redis_1.default.select(0, (err, res) => {
                                // tslint:disable-next-line: no-console
                                console.log(res);
                            });
                            redis_1.default.del(keyword, (er, o) => {
                                if (er) {
                                    // tslint:disable-next-line: no-console
                                    console.log("error while clearing:-", er);
                                }
                                else {
                                    // tslint:disable-next-line: no-console
                                    console.log("cleared", o);
                                }
                            });
                        }
                    }
                });
            });
        });
    }
    redisCacheKeyword(redisSchema) {
        redis_1.default.select(14, (err, res) => {
            // tslint:disable-next-line: no-console
            console.log(res);
        });
        return new Promise((resolve, reject) => {
            redis_1.default.select(redisSchema, (err, res) => {
                if (res) {
                    redis_1.default.select(14, (e, resd) => {
                        // tslint:disable-next-line: no-console
                        console.log(resd);
                    });
                    redis_1.default.select(14, (er, resdel) => {
                        // tslint:disable-next-line: no-console
                        console.log(resdel);
                    });
                    redis_1.default.keys('*', (error, keysData) => {
                        if (error) {
                            return reject(err);
                        }
                        if (keysData) {
                            redis_1.default.del(keysData, (er, o) => {
                                if (er) {
                                    // tslint:disable-next-line: no-console
                                    console.log("redis error 123", err);
                                }
                                else {
                                    // tslint:disable-next-line: no-console
                                    console.log("redis set value", o);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    setRedisValue(value, redisSchema) {
        return new Promise((resolve, reject) => {
            redis_1.default.select(redisSchema, (err, res) => {
                if (res)
                    redis_1.default.set(value.redisKey, JSON.stringify(value.redisValue));
                resolve(true);
            });
        });
    }
}
exports.default = RedisCache;
//# sourceMappingURL=RedisCache.js.map