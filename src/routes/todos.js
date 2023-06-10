import { Router } from 'express';
import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/TodoController';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();

router.get('/', isAuthenticated, getAllTodos);
router.get('/:id', isAuthenticated, getTodo);
router.post('/', isAuthenticated, createTodo);
router.patch('/:id', isAuthenticated, updateTodo);
router.delete('/:id', isAuthenticated, deleteTodo);

export default router;
