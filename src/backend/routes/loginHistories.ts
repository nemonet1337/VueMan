import { Router } from 'express';
import { authenticate } from '../utils/auth';
import { createLoginHistory, getMyLoginHistories } from '../controllers/loginHistoriesController';

const router = Router();

router.post('/', authenticate, createLoginHistory);
router.get('/me', authenticate, getMyLoginHistories);

export default router;
