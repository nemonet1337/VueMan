import { Router } from 'express';
import * as controller from '../controllers/employees';

const router = Router();

router.get('/', controller.getEmployees);
router.get('/:id', controller.getEmployeeById);
router.post('/', controller.createEmployee);
router.put('/:id', controller.updateEmployee);
router.delete('/:id', controller.deleteEmployee);

export default router;
