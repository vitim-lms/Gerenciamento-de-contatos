import {Router} from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { show_adm } from '../controllers/adm_controller';

const admRoutes = Router();

admRoutes.get('/adm', authMiddleware, show_adm);

export {
    admRoutes
}