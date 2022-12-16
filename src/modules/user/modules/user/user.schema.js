"use strict";
exports.__esModule = true;
exports.PartnerSchema = void 0;
var joi_1 = require("@hapi/joi");
var i18n_1 = require("../../../../config/i18n");
var supportLinkSchema = joi_1["default"].object().keys({
    topic: joi_1["default"].string().required().label(i18n_1["default"].__('label_topic')),
    email_address: joi_1["default"].string().required().label(i18n_1["default"].__('email_address')),
    query_message: joi_1["default"].string().required().label(i18n_1["default"].__('label_query_message'))
});
var initDashboardSummarySchema = joi_1["default"].object().keys({
    partner_id: joi_1["default"].string().required().label(i18n_1["default"].__('partner_id'))
});
exports.PartnerSchema = {
    '/supportLink': supportLinkSchema,
    '/initDashboardSummary': initDashboardSummarySchema
};
