import { Router } from "express";
import APIController from "../controllers/APIController";


const router = Router()

router.get('/randomUsers/:page', APIController.getRandomUsers)
router.get('/catImage/:code', APIController.getHttpCatImage)
router.get('/dogImage', APIController.getRandomDogImage)


export default router