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
// import db from "../../config/database/mysql-connection";
const base_repository_1 = __importDefault(require("../../../shared/base.repository"));
const config_1 = __importDefault(require("../../../../config/config"));
class UserProfileRepository extends base_repository_1.default {
    checkUserExistsOrNOt(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT marketing_partner_users.id, marketing_partner_users.marketing_partner_id, AESDecrypt(mt_users.email_address,'${config_1.default.mysqlHashKey}') email_address, AESDecrypt(mt_users.first_name,'${config_1.default.mysqlHashKey}') first_name, AESDecrypt(mt_users.last_name,'${config_1.default.mysqlHashKey}') last_name, mt_users.password,
        AESDecrypt(mt_users.country_code,'${config_1.default.mysqlHashKey}') country_code, AESDecrypt(mt_users.mobile_number,'${config_1.default.mysqlHashKey}') mobile_number,marketing_partner_users.status, mt_users.agency_name, mt_users.gender, mt_users.password
        FROM marketing_partner_users
        JOIN marketing_partner on marketing_partner.id = marketing_partner_users.marketing_partner_id
		JOIN mt_users on marketing_partner_users.user_id = mt_users.id AND mt_users.status = 1 AND marketing_partner_users.status = 1
        WHERE mt_users.email_address = AESEncrypt(?,'${config_1.default.mysqlHashKey}') AND marketing_partner_users.status = 1 AND marketing_partner.is_active = 1 AND marketing_partner_users.marketing_partner_id = ?;`;
            return yield this.excuteQuery({ sqlQuery, params: [params.emailAddress, params.companyId], isSingle: true });
        });
    }
    checkUserExistance(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM mt_users WHERE id = ? AND status = 1;`;
            return yield this.excuteQuery({ sqlQuery, params: [params.userId], isSingle: true });
        });
    }
    changePassowrd(params) {
        const sqlQuery = `UPDATE mt_users SET temporary_password = NULL, password = ? WHERE id = ?;`;
        return this.excuteQuery({ sqlQuery, params: [params.newPassword, params.userId] })
            .then(row => row.data);
    }
}
exports.default = UserProfileRepository;
//# sourceMappingURL=user-profile.repository.js.map