import { Router } from "express";
import userController from "../controllers/userController";
import userValidations from "../middlewares/userValidations";
import loginRequired from "../middlewares/loginRequired";

const router = Router()

// router.get('/', userController.index)
router.post('/', userValidations, userController.create)
router.get('/', loginRequired, userController.read)
router.delete('/', loginRequired, userController.delete)

export default router