"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const base_controller_1 = __importDefault(require("../../../shared/base.controller"));
const user_profile_repository_1 = __importDefault(require("./user-profile.repository"));
const userProfileRepository = new user_profile_repository_1.default();
class UserProfileController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.changePassword = (request, response, next) => {
            try {
                const emailAddress = request.body.email_address;
                const userId = request.body.user_id;
                const companyId = request.body.company_id;
                userProfileRepository
                    .checkUserExistance({ userId })
                    .then((result) => {
                    if (!result) {
                        return this.setResponse({
                            response,
                            msgType: "invalid_email_address_sponsor",
                            statusFlag: false,
                            statusCode: 422,
                            error: "Invalid Email Address and/or Sponsor Code.",
                        });
                    }
                    if (bcryptjs_1.default.compareSync(request.body.current_password, result.data.password)) {
                        const newPassword = bcryptjs_1.default.hashSync(request.body.new_password, 10);
                        userProfileRepository
                            .changePassowrd({ userId, newPassword })
                            .then((updateResponse) => {
                            return this.setResponse({
                                response,
                                msgType: "password_changed_successfully",
                                statusFlag: true,
                                statusCode: 200,
                                message: "Password changed successfully, Please login again.",
                                data: updateResponse,
                            });
                        }).catch((error) => next(error));
                    }
                    else {
                        return this.setResponse({
                            response,
                            msgType: "invalid_current_password",
                            statusFlag: false,
                            statusCode: 422,
                            error: "Invalid Current Password.",
                        });
                    }
                })
                    .catch((error) => next(error));
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = UserProfileController;
//# sourceMappingURL=user-profile.controller.js.map