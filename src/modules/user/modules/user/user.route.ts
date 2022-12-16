import express from 'express';
// import SchemaValidator from '../../../../common/middleware/schema-validator.middleware';
import SchemaValidator from '../../middleware/user-schema-validator.middleware';
import UserController from './user.controller';
import { UserSchema } from './user.schema';
const controller = new UserController();
const router = express.Router({ caseSensitive: true });
const validateRequest = SchemaValidator(true, UserSchema);
router.post("/getUserInfo", validateRequest, (req, res, next) => controller.getUserInfo(req, res, next));
router.post("/saveUserInfo", validateRequest, (req, res, next) => controller.saveUserInfo(req, res, next));
export default router
