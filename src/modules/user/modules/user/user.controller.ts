import BaseController from '../../../shared/base.controller';
import UserRepository from "./user.repository";
import { NextFunction, Request, Response } from "express";

const userRepository = new UserRepository();

class UserController extends BaseController {
    async getUserInfo(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await userRepository.excuteQuery({ sqlQuery: "SELECT * FROM user", params: [], isSingle: false });
            this.setResponse({
                response,
                statusFlag: true,
                statusCode: 200,
                data: result
            })

        } catch (error) {
            next(error);
        }
    }
    async saveUserInfo(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await userRepository.excuteQuery({ sqlQuery: "INSERT INTO user ( first_name, last_name, address, phone_number, age, aadhar_no) VALUES (?, ?, ?, ?, ?, ?);",
            params: [request.body.first_name, request.body.last_name, request.body.address, request.body.phone_number, request.body.age, request.body.aadhar_no]});
            this.setResponse({
                response,
                statusFlag: true,
                statusCode: 200,
                data: result
            })

        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
