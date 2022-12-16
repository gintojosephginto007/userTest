import express from 'express';
import partnerRouter from '../modules/user/user.route';

const router = express.Router({ caseSensitive: true });
router.use("", partnerRouter);

export default router;