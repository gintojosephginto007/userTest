"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../../../shared/base.controller"));
const user_repository_1 = __importDefault(require("./user.repository"));
const partnerRepository = new user_repository_1.default();
class PartnerController extends base_controller_1.default {
}
exports.default = PartnerController;
//# sourceMappingURL=user.controller.js.map