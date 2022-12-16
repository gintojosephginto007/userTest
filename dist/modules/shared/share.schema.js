"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const joi_custom_schema_1 = require("../../common/validators/joi-custom-schema");
const uploadSchema = joi_1.default.object().keys({
    /* source: StringInput.required().valid('company', 'company_user', 'brand').options({
      messages: {
        "any.only": 'Invalid {{#label}}'
      }
    }),
    source_id: StringInput.required(), */
    source_key: joi_custom_schema_1.StringInput.optional(),
    source: joi_custom_schema_1.StringInput.required(),
});
const getLanguageCategoriesSchema = joi_1.default.object().keys({
    language_id: joi_1.default.number().positive().required().default(1)
});
const getCampaignImagesSchema = joi_1.default.object().keys({
    offer_id: joi_1.default.number().positive().required()
});
exports.ShareSchema = {
    "/upload": uploadSchema,
    "/getLanguageCategories": getLanguageCategoriesSchema,
    "/getCampaignImages": getCampaignImagesSchema
};
//# sourceMappingURL=share.schema.js.map