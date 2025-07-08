import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import * as ctrl from '../controllers/businessLocationsController';

const router = Router();

router.use(authenticate);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
