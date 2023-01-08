import express  from "express";
import { ToughtsController } from "../controllers/ToughtsController";
import checkAuth from "../utils/auth";

const router = express.Router()

router.get('/dashbord', checkAuth, ToughtsController.dashbord)
    .get('/add', checkAuth, ToughtsController.createToughts)
    .get('/edit/:id', checkAuth, ToughtsController.editToughts)
    .post('/add', checkAuth, ToughtsController.createToughtsSave)
    .post('/remove',checkAuth, ToughtsController.removeTought)
    .post('/edit', checkAuth, ToughtsController.editToughtsSave)
    .get('/', ToughtsController.showToughts)

export default router;