import { Router } from 'express';
import authenticate from '../middlewares/auth';
import { getDailyReport, getMonthlyReport, getOfficeSummary, recalculateReport } from '../controllers/reportController';

const router = Router();
router.use(authenticate);

router.get('/daily', getDailyReport);
router.get('/monthly', getMonthlyReport);
router.get('/summary', getOfficeSummary);
router.post('/recalculate', recalculateReport);

export default router;
