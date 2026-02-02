import {Router} from 'express';
import * as UserController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

export default router;