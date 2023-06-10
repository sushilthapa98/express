import { Router } from 'express';
import { login, logout, register } from '../controllers/AuthController';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();

router.get('/login', login);
router.post('/register', register);
router.post('/logout', isAuthenticated, logout);

export default router;
