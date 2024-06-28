import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { protectedRouter } from '../controller/protectedRoute';

const router = Router();

// Apply the verifyToken middleware to protect routes
router.use(verifyToken);

router.get('/protectedrouter', protectedRouter);

export default router;