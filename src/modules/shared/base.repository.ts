import _ from 'lodash';
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
// import { serverLogger } from '../../common/logger';
import { EmailTemplate } from '../../common/models/email-params.interface';
import { SMSTemplate } from '../../common/models/sms-params.interface';
import { IProcedureParams, ISpResponse, ISqlExcuteParams, ISqlExcuteResult } from "../../common/models/sql-excute.interface";
import masterDb from "../../config/database/mysql-master-connection";
// import slaveDb from "../../config/database/mysql-slave-connection";
export default class BaseRepository {

    /* public excuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams): Promise<ISqlExcuteResult> {
        return masterDb.query(sqlQuery, params)
            .then(([result]) => ({
                status: true,
                data: isSingle ? this.parseSingleResult(result) : this.parseResult(result),
                error: null
            }));
    } */

    public excuteQuery = ({ sqlQuery, params, isSingle }: ISqlExcuteParams): Promise<ISqlExcuteResult> => new Promise((resolve, reject) => {
        masterDb.getConnection((err, connection) => {
            if (err) {
                return reject(err)
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
                        })
                    });
                }).on('error', (QueryError) => {
                    connection.release();
                    return reject(QueryError);
                })
            })
        })
    })

    public excuteProcedure(inputParams: IProcedureParams): Promise<ISpResponse> {
        if (!_.isObject(inputParams.params)) {
            throw new Error(`Procedure Error ${inputParams.procedureName}: Params must be Object`);
        }
        const procedureName = inputParams.procedureName;
        const params = inputParams.params;
        const sqlQuery = `CALL ${procedureName}(?);`;
        return masterDb.promise().query(sqlQuery, JSON.stringify(params))
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

    protected parseSingleResult(result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader) {
        return JSON.parse(JSON.stringify(result))[0] || null;
    }

    protected parseResult(result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader) {
        return JSON.parse(JSON.stringify(result)) || null;
    }

    getSMSTemplate(smsTemplateName: string): Promise<SMSTemplate> {
        const sqlQuery = 'SELECT sms_name, title, message FROM sms_templates WHERE sms_name = ?;';
        return this.excuteQuery({ sqlQuery, params: [smsTemplateName], isSingle: true })
            .then(result => result.data as SMSTemplate);
    }

    getEmailTemplate(emailTemplateName: string): Promise<EmailTemplate> {
        const sqlQuery = 'SELECT description, email_to, email_cc, email_bcc,email_from, subject,text1 FROM email_templates WHERE name = ?;';
        return this.excuteQuery({ sqlQuery, params: [emailTemplateName], isSingle: true })
            .then(result => result.data as EmailTemplate);
    }

    closeMasterDb() {
        masterDb.end();
    }

    /* closeSlave() {
        slaveDb.end();
    } */
}
