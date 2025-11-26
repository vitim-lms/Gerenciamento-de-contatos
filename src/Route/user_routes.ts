import { Router } from 'express';
import { register, show_list, show_login } from '../controller/user_controller';


const userRoutes = Router();

userRoutes.get('/user/login', show_login);
userRoutes.get('/user/list', show_list);
userRoutes.post('/user/register', register)
export {
    userRoutes
};