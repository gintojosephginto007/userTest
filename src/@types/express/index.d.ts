import { IUser } from "../../common/models/user.interface";

declare global {
    namespace Express {

        interface Request {
            isFile: boolean;
            decoded: IUser;
        }

        interface Response {
            isFile: boolean;
            decoded: IUser;
            body: any;
            path: string;
        }
    }
}
