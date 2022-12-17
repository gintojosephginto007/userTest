"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import SchemaValidator from '../../../../common/middleware/schema-validator.middleware';
const user_schema_validator_middleware_1 = __importDefault(require("../../middleware/user-schema-validator.middleware"));
const user_controller_1 = __importDefault(require("./user.controller"));
const user_schema_1 = require("./user.schema");
const controller = new user_controller_1.default();
const router = express_1.default.Router({ caseSensitive: true });
const validateRequest = user_schema_validator_middleware_1.default(true, user_schema_1.UserSchema);
router.get("", validateRequest, (req, res, next) => controller.health(req, res, next));
exports.default = router;
//# sourceMappingURL=health.route.js.map