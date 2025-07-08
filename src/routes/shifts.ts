import { Router } from 'express';
import auth from '../middleware/auth';
import * as controller from '../controllers/shiftsController';

const router = Router();
router.use(auth);

router.get('/', controller.getShifts);
router.post('/', controller.createShift);
router.put('/:id', controller.updateShift);
router.delete('/:id', controller.deleteShift);

export default router;
