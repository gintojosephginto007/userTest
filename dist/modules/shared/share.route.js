"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_validator_middleware_1 = __importDefault(require("../../common/middleware/schema-validator.middleware"));
const share_controller_1 = __importDefault(require("./share.controller"));
const share_schema_1 = require("./share.schema");
const controller = new share_controller_1.default();
const router = express_1.default.Router({ caseSensitive: true });
const validateRequest = schema_validator_middleware_1.default(true, share_schema_1.ShareSchema);
// router.post("/getCampaignImages", validateRequest, (req, res, next) => controller.getCampaignImagePath(req, res, next));
exports.default = router;
//# sourceMappingURL=share.route.js.map