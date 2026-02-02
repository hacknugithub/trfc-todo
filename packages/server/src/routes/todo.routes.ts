import {Router} from 'express';
import * as TodoController from '../controllers/todo.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', TodoController.getAll);
router.post('/', authenticateToken, TodoController.create);
router.put('/:id', authenticateToken, TodoController.update);
router.patch('/:id', authenticateToken, TodoController.update);
router.delete('/:id', authenticateToken, TodoController.remove);

export default router;