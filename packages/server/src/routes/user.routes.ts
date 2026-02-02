import {Router} from 'express';
import * as UserController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken,UserController.getAll);
router.get('/:id', authenticateToken ,UserController.getOne);
router.post('/', UserController.create);
router.put('/:id', authenticateToken,UserController.update);
router.delete('/:id', authenticateToken,UserController.remove);

export default router;