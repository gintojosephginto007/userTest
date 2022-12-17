import express from 'express';
import commonMiddleware from '../common/middleware/common.middleware';
import userRouter from "../modules/user/routes";

const router = express.Router({ caseSensitive: true })
router.use(commonMiddleware);
router.use("", userRouter);

export default router
