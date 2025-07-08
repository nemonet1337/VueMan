import { Router } from 'express';
import * as controller from '../controllers/usersController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.use(authenticate);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
