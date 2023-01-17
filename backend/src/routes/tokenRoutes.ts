import { Router } from 'express'
import tokenController from '../controllers/tokenController'

const router = Router()

router.post('/', tokenController.create)

export default router
