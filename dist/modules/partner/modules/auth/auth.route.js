"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_schema_1 = require("./auth.schema");
// import SchemaValidator from '../../../../common/middleware/schema-validator.middleware';
const partner_schema_validator_middleware_1 = __importDefault(require("../../middleware/user-schema-validator.middleware"));
const controller = new auth_controller_1.default();
const router = express_1.default.Router({ caseSensitive: true });
const validateRequest = partner_schema_validator_middleware_1.default(true, auth_schema_1.AuthSchema);
// router.post("/changePassword", validateRequest, (req, res, next) => controller.changePassword(req, res, next));
exports.default = router;
//# sourceMappingURL=auth.route.js.map