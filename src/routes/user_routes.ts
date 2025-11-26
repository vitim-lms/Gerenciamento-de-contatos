import { Router } from 'express';
import { login, register, show_list, show_login } from '../controllers/user_controller';

const userRoutes = Router();

userRoutes.get('/user/login', show_login);
userRoutes.get('/user/list', show_list);
userRoutes.post('/user/register', register);
userRoutes.post('/user/login', login);


export {
    userRoutes
}