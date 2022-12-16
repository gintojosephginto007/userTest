"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const mysql_master_connection_1 = __importDefault(require("../../config/database/mysql-master-connection"));
// import slaveDb from "../../config/database/mysql-slave-connection";
class BaseRepository {
    constructor() {
        /* public excuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams): Promise<ISqlExcuteResult> {
            return masterDb.query(sqlQuery, params)
                .then(([result]) => ({
                    status: true,
                    data: isSingle ? this.parseSingleResult(result) : this.parseResult(result),
                    error: null
                }));
        } */
        this.excuteQuery = ({ sqlQuery, params, isSingle }) => new Promise((resolve, reject) => {
            mysql_master_connection_1.default.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.beginTransaction((transErr) => {
                    if (transErr) {
                        return connection.rollback(() => {
                            connection.release();
                            return reject(transErr);
                        });
                    }
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return reject(err);
                        });
                    }
                    connection.query(sqlQuery, params, (sqlErr, sqlResult, fields) => {
                        connection.release();
                        if (sqlErr) {
                            return connection.rollback(() => reject(sqlErr));
                        }
                        connection.commit((commitErr) => {
                            if (commitErr) {
                                return connection.rollback(() => reject(commitErr));
                            }
                            return resolve({
                                status: true,
                                data: isSingle ? this.parseSingleResult(sqlResult) : this.parseResult(sqlResult),
                                error: null
                            });
                        });
                    }).on('error', (QueryError) => {
                        connection.release();
                        return reject(QueryError);
                    });
                });
            });
        });
        /* closeSlave() {
            slaveDb.end();
        } */
    }
    excuteProcedure(inputParams) {
        if (!lodash_1.default.isObject(inputParams.params)) {
            throw new Error(`Procedure Error ${inputParams.procedureName}: Params must be Object`);
        }
        const procedureName = inputParams.procedureName;
        const params = inputParams.params;
        const sqlQuery = `CALL ${procedureName}(?);`;
        return mysql_master_connection_1.default.promise().query(sqlQuery, JSON.stringify(params))
            .then(([result]) => JSON.parse(JSON.stringify(result))[0][0].response);
        // .then((res:ISpResponse) => );
    }
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
    parseSingleResult(result) {
        return JSON.parse(JSON.stringify(result))[0] || null;
    }
    parseResult(result) {
        return JSON.parse(JSON.stringify(result)) || null;
    }
    getSMSTemplate(smsTemplateName) {
        const sqlQuery = 'SELECT sms_name, title, message FROM sms_templates WHERE sms_name = ?;';
        return this.excuteQuery({ sqlQuery, params: [smsTemplateName], isSingle: true })
            .then(result => result.data);
    }
    getEmailTemplate(emailTemplateName) {
        const sqlQuery = 'SELECT description, email_to, email_cc, email_bcc,email_from, subject,text1 FROM email_templates WHERE name = ?;';
        return this.excuteQuery({ sqlQuery, params: [emailTemplateName], isSingle: true })
            .then(result => result.data);
    }
    closeMasterDb() {
        mysql_master_connection_1.default.end();
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=base.repository.js.map