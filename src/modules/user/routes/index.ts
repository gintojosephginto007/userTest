import express from 'express';
import partnerRouter from '../modules/user/user.route';
import test from  '../modules/user/health.route'

const router = express.Router({ caseSensitive: true });

router.use("", test);
router.use("/api/user", partnerRouter);

export default router;