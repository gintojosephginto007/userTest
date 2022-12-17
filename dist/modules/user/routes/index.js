"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const health_route_1 = __importDefault(require("../modules/user/health.route"));
const router = express_1.default.Router({ caseSensitive: true });
router.use("", health_route_1.default);
router.use("/api/user", user_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map