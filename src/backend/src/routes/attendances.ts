import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { createRecord, getMyRecords, getRecordsByDate } from '../controllers/attendanceController';

const router = Router();

router.post('/clock-in', authenticate, async (req: Request, res: Response) => {
  try {
    const record = await createRecord('clock-in', req.user!.id, req.body);
    res.json({ data: record, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'validation error' });
  }
});

router.post('/clock-out', authenticate, async (req: Request, res: Response) => {
  try {
    const record = await createRecord('clock-out', req.user!.id, req.body);
    res.json({ data: record, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'validation error' });
  }
});

router.post('/break-start', authenticate, async (req: Request, res: Response) => {
  try {
    const record = await createRecord('break-start', req.user!.id, req.body);
    res.json({ data: record, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'validation error' });
  }
});

router.post('/break-end', authenticate, async (req: Request, res: Response) => {
  try {
    const record = await createRecord('break-end', req.user!.id, req.body);
    res.json({ data: record, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'validation error' });
  }
});

router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const records = await getMyRecords(req.user!.id);
    res.json({ data: records, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'validation error' });
  }
});

router.get('/', authenticate, async (req: Request, res: Response) => {
  const { date } = req.query as { date?: string };
  if (!date) return res.status(400).json({ message: 'validation error' });
  try {
    const records = await getRecordsByDate(date);
    res.json({ data: records, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'validation error' });
  }
});

export default router;
