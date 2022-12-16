"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import db from "../../config/database/mysql-connection";
const base_repository_1 = __importDefault(require("../../../shared/base.repository"));
const config_1 = __importDefault(require("../../../../config/config"));
class AuthRepository extends base_repository_1.default {
    isBrandUser(params) {
        // const sqlQuery = `SELECT company_users.id, company.id as company_id, ${this.userQuery()}
        // WHERE company.is_active = 1 AND users.email_address = AESEncrypt(?,'${config.mysqlHashKey}') `;
        const sqlQuery = `select * from company_users limit 1`;
        // tslint:disable-next-line: no-console
        // console.log("Ginto "+sqlQuery);
        return this.excuteQuery({ sqlQuery, params: [params.email_address], isSingle: true })
            .then(row => row.data);
    }
    newFindUser(params) {
        // tslint:disable-next-line: no-console
        console.log("params:", params);
        // tslint:disable-next-line: no-console
        console.log("config.mysqlHashKey:", config_1.default.mysqlHashKey);
        const sqlQuery = `SELECT  CONCAT(AESDecrypt(mt_users.first_name,'${config_1.default.mysqlHashKey}'), " ", AESDecrypt(mt_users.last_name,'${config_1.default.mysqlHashKey}')) as full_name, mt_users.id, mt_users.status, mt_users.password, mt_users.id
        from mt_users WHERE mt_users.status = 1 AND mt_users.email_address = AESEncrypt('` + params.email_address + `','${config_1.default.mysqlHashKey}');`;
        // tslint:disable-next-line: no-console
        console.log(sqlQuery);
        return this.excuteQuery({ sqlQuery, params: [], isSingle: true })
            .then((row) => {
            // tslint:disable-next-line: no-console
            console.log("row:", row);
            return row.data;
        }).catch(error => {
            // tslint:disable-next-line: no-console
            console.log("error:", error);
        });
    }
    getMarketingPartnerList(id) {
        const sqlQuery = `SELECT mp.id, mp.partner_name FROM marketing_partner_users AS mpu, marketing_partner AS mp WHERE mpu.mt_user_id = ? AND mpu.marketing_partner_id = mp.id AND mp.status = 1 AND mpu.status = 1 `;
        return this.excuteQuery({ sqlQuery, params: [id] })
            .then(row => row.data);
    }
    checkUserExistsOrNOt(params) {
        const sqlQuery = `SELECT mpu.id, mpu.marketing_partner_id, AESDecrypt(mt_users.email_address,'${config_1.default.mysqlHashKey}') email_address, AESDecrypt(mt_users.first_name,'${config_1.default.mysqlHashKey}') first_name, AESDecrypt(mt_users.last_name,'${config_1.default.mysqlHashKey}') last_name,
        AESDecrypt(mt_users.country_code,'${config_1.default.mysqlHashKey}') country_code, AESDecrypt(mt_users.mobile_number,'${config_1.default.mysqlHashKey}') mobile_number, mt_users.status, mt_users.gender,
        CONCAT(mt_users.first_name, ' ', mt_users.last_name) AS name, CURRENT_TIMESTAMP() + 1 AS link_generation_time
        FROM marketing_partner_users AS mpu
        JOIN marketing_partner on marketing_partner.id = mpu.marketing_partner_id
		JOIN mt_users AS mt_users ON mpu.mt_user_id = mt_users.id AND mt_users.status = 1
        WHERE mt_users.email_address = AESEncrypt(?,'${config_1.default.mysqlHashKey}') AND mt_users.status = 1 AND marketing_partner.status = 1;`;
        return this.excuteQuery({ sqlQuery, params: [params.email_address], isSingle: true })
            .then(row => row.data);
    }
    checkUserExistsForgotPassword(params) {
        const sqlQuery = `SELECT mpu.id, AESDecrypt(mt_users.email_address,'${config_1.default.mysqlHashKey}') email_address, AESDecrypt(mt_users.first_name,'${config_1.default.mysqlHashKey}') first_name, AESDecrypt(mt_users.last_name,'${config_1.default.mysqlHashKey}') last_name,
        AESDecrypt(mt_users.country_code,'${config_1.default.mysqlHashKey}') country_code, AESDecrypt(mt_users.mobile_number,'${config_1.default.mysqlHashKey}') mobile_number,  mt_users.status, mt_users.gender,
        AESDecrypt(mt_users.first_name,'${config_1.default.mysqlHashKey}') AS name, CURRENT_TIMESTAMP() + 1 AS link_generation_time, marketing_partner.status AS marketing_partner_status,
        marketing_partner.partner_code
        FROM marketing_partner_users AS mpu
        JOIN marketing_partner on marketing_partner.id = mpu.marketing_partner_id
		JOIN mt_users AS mt_users ON mpu.mt_user_id = mt_users.id AND mt_users.status = 1
        WHERE mt_users.email_address = AESEncrypt(?,'${config_1.default.mysqlHashKey}');`;
        return this.excuteQuery({ sqlQuery, params: [params.email_address], isSingle: true })
            .then(row => row.data);
    }
    resetPassowrd(params) {
        const sqlQuery = `UPDATE mt_users SET temporary_password = NULL, password = ? WHERE email_address = AESEncrypt(?,'${config_1.default.mysqlHashKey}');`;
        return this.excuteQuery({ sqlQuery, params: [params.new_password, params.email_address] })
            .then(row => row.data);
    }
}
exports.default = AuthRepository;
//# sourceMappingURL=auth.repository.js.map