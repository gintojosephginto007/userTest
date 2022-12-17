"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_middleware_1 = __importDefault(require("../common/middleware/common.middleware"));
const routes_1 = __importDefault(require("../modules/user/routes"));
const router = express_1.default.Router({ caseSensitive: true });
router.use(common_middleware_1.default);
router.use("", routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map