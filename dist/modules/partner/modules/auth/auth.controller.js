"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../../../shared/base.controller"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
const authRepository = new auth_repository_1.default();
class AuthController extends base_controller_1.default {
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map