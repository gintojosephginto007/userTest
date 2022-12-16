import { NextFunction, Request, Response } from 'express';
export default (request: Request, response: Response, next: NextFunction) => {

    let token = '';
    if (request.headers.authorization) {
        token = request.headers.authorization;
    } else {
        token = request.body.token || request.query.token;
    }
    const details: any = [];
    const authError = {
        status: 'FAILURE',
        statusCode: 401,
        data: {},
        error: {
            message: 'Un-authorised access',
            details
        }
    }

    if (!token) {
        response.status(authError.statusCode).json(authError);
        return;
    }
};