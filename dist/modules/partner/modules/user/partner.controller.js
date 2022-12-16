"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../../../shared/base.controller"));
const partner_repository_1 = __importDefault(require("./partner.repository"));
const partnerRepository = new partner_repository_1.default();
class PartnerController extends base_controller_1.default {
}
exports.default = PartnerController;
//# sourceMappingURL=partner.controller.js.map