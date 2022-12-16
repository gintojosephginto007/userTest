"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import slaveDb from "../../config/database/mysql-slave-connection";
const base_repository_1 = __importDefault(require("./base.repository"));
const baseRepository = new base_repository_1.default();
class DataTableController {
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    parseSingleResult(result) {
        return JSON.parse(JSON.stringify(result))[0] || null;
    }
    parseResult(result) {
        return JSON.parse(JSON.stringify(result)) || null;
    }
}
exports.default = DataTableController;
//# sourceMappingURL=data-table.controller.js.map