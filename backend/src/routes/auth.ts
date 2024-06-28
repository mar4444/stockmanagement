import { Router } from 'express';
import { signup } from '../controller/userController';
import { login } from '../controller/userController';
// import { protectedRouter } from '../controller/protectedRoute';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
// router.get('/protectedrouter', protectedRouter);

export default router;

