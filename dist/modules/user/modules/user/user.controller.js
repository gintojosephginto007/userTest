"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../../../shared/base.controller"));
const user_repository_1 = __importDefault(require("./user.repository"));
const userRepository = new user_repository_1.default();
class UserController extends base_controller_1.default {
    getUserInfo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userRepository.excuteQuery({ sqlQuery: "SELECT * FROM user", params: [], isSingle: false });
                this.setResponse({
                    response,
                    statusFlag: true,
                    statusCode: 200,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    saveUserInfo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userRepository.excuteQuery({ sqlQuery: "INSERT INTO user ( first_name, last_name, address, phone_number, age, aadhar_no) VALUES (?, ?, ?, ?, ?, ?);",
                    params: [request.body.first_name, request.body.last_name, request.body.address, request.body.phone_number, request.body.age, request.body.aadhar_no] });
                this.setResponse({
                    response,
                    statusFlag: true,
                    statusCode: 200,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    health(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setResponse({
                    response,
                    statusFlag: true,
                    statusCode: 200,
                    data: {}
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map