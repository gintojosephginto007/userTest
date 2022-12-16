"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("./base.controller"));
const share_repository_1 = __importDefault(require("./share.repository"));
const shareRepository = new share_repository_1.default();
class ShareController extends base_controller_1.default {
}
exports.default = ShareController;
//# sourceMappingURL=share.controller.js.map