import { NextFunction, Request, Response } from 'express';
export default (req: Request, res: Response, next: NextFunction) => {
    res.body = req.body;
    res.path = req.path;
    next();
}