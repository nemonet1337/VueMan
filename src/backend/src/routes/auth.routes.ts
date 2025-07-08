import { Router } from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/login', login);
router.get('/auth/me', authenticate, getMe);

export default router;
