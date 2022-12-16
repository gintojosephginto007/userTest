"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const i18n_1 = __importDefault(require("../../../../config/i18n"));
const supportLinkSchema = joi_1.default.object().keys({
    topic: joi_1.default.string().required().label(i18n_1.default.__('label_topic')),
    email_address: joi_1.default.string().required().label(i18n_1.default.__('email_address')),
    query_message: joi_1.default.string().required().label(i18n_1.default.__('label_query_message')),
});
const initDashboardSummarySchema = joi_1.default.object().keys({
    partner_id: joi_1.default.string().required().label(i18n_1.default.__('partner_id'))
});
exports.PartnerSchema = {
    '/supportLink': supportLinkSchema,
    '/initDashboardSummary': initDashboardSummarySchema
};
//# sourceMappingURL=partner.schema.js.map