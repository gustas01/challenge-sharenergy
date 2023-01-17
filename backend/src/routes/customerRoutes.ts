import { Router } from "express";
import customerController from "../controllers/customerController";
import customerValidations from "../middlewares/customerValidations";

const router = Router()

router.get('/', customerController.index)
router.post('/', customerValidations, customerController.create)
router.get('/:id', customerController.read)
router.put('/:id', customerValidations, customerController.update)
router.delete('/:id', customerController.delete)

export default router