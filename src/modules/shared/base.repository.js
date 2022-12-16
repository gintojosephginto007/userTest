"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var mysql_master_connection_1 = require("../../config/database/mysql-master-connection");
// import slaveDb from "../../config/database/mysql-slave-connection";
var BaseRepository = /** @class */ (function () {
    function BaseRepository() {
        /* public excuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams): Promise<ISqlExcuteResult> {
            return masterDb.query(sqlQuery, params)
                .then(([result]) => ({
                    status: true,
                    data: isSingle ? this.parseSingleResult(result) : this.parseResult(result),
                    error: null
                }));
        } */
        var _this = this;
        this.excuteQuery = function (_a) {
            var sqlQuery = _a.sqlQuery, params = _a.params, isSingle = _a.isSingle;
            return new Promise(function (resolve, reject) {
                mysql_master_connection_1["default"].getConnection(function (err, connection) {
                    if (err) {
                        return reject(err);
                    }
                    connection.beginTransaction(function (transErr) {
                        if (transErr) {
                            return connection.rollback(function () {
                                connection.release();
                                return reject(transErr);
                            });
                        }
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                return reject(err);
                            });
                        }
                        connection.query(sqlQuery, params, function (sqlErr, sqlResult, fields) {
                            connection.release();
                            if (sqlErr) {
                                return connection.rollback(function () { return reject(sqlErr); });
                            }
                            connection.commit(function (commitErr) {
                                if (commitErr) {
                                    return connection.rollback(function () { return reject(commitErr); });
                                }
                                return resolve({
                                    status: true,
                                    data: isSingle ? _this.parseSingleResult(sqlResult) : _this.parseResult(sqlResult),
                                    error: null
                                });
                            });
                        }).on('error', function (QueryError) {
                            connection.release();
                            return reject(QueryError);
                        });
                    });
                });
            });
        };
        /* closeSlave() {
            slaveDb.end();
        } */
    }
    BaseRepository.prototype.excuteProcedure = function (inputParams) {
        if (!lodash_1["default"].isObject(inputParams.params)) {
            throw new Error("Procedure Error " + inputParams.procedureName + ": Params must be Object");
        }
        var procedureName = inputParams.procedureName;
        var params = inputParams.params;
        var sqlQuery = "CALL " + procedureName + "(?);";
        return mysql_master_connection_1["default"].promise().query(sqlQuery, JSON.stringify(params))
            .then(function (_a) {
            var result = _a[0];
            return JSON.parse(JSON.stringify(result))[0][0].response;
        });
        // .then((res:ISpResponse) => );
    };
    /* public slaveExcuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams): Promise<ISqlExcuteResult> {
        return slaveDb.query(sqlQuery, params)
            .then(([result]) => ({
                status: true,
                data: isSingle ? this.parseSingleResult(result) : this.parseResult(result),
                error: null
            }));
    } */
    /* public slaveExcuteProcedure(inputParams: IProcedureParams): Promise<ISpResponse> {
        if (!_.isObject(inputParams.params)) {
            throw new Error(`Procedure Error ${inputParams.procedureName}: Params must be Object`);
        }
        const procedureName = inputParams.procedureName;
        const params = inputParams.params;
        const sqlQuery = `CALL ${procedureName}(?);`;
        return slaveDb.query(sqlQuery, JSON.stringify(params)).then(([result]) => JSON.parse(JSON.stringify(result))[0][0].response);
    } */
    BaseRepository.prototype.parseSingleResult = function (result) {
        return JSON.parse(JSON.stringify(result))[0] || null;
    };
    BaseRepository.prototype.parseResult = function (result) {
        return JSON.parse(JSON.stringify(result)) || null;
    };
    BaseRepository.prototype.getSMSTemplate = function (smsTemplateName) {
        var sqlQuery = 'SELECT sms_name, title, message FROM sms_templates WHERE sms_name = ?;';
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [smsTemplateName], isSingle: true })
            .then(function (result) { return result.data; });
    };
    BaseRepository.prototype.getEmailTemplate = function (emailTemplateName) {
        var sqlQuery = 'SELECT description, email_to, email_cc, email_bcc,email_from, subject,text1 FROM email_templates WHERE name = ?;';
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [emailTemplateName], isSingle: true })
            .then(function (result) { return result.data; });
    };
    BaseRepository.prototype.closeMasterDb = function () {
        mysql_master_connection_1["default"].end();
    };
    return BaseRepository;
}());
exports["default"] = BaseRepository;
