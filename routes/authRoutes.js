import express  from "express";
const router = express.Router()
import { AuthController } from "../controllers/AuthController.js";

router.get('/login', AuthController.login)
    .post('/login', AuthController.loginPost)
    .get('/register', AuthController.register)
    .post('/register', AuthController.registerPost)
    .get('/logout', AuthController.logout)

export default router;