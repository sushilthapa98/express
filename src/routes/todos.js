import { Router } from 'express';
import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/TodoController';
import isAuthenticated from '../middlewares/isAuthenticated';
import upload from '../middlewares/upload';

const router = Router();

router.get('/', isAuthenticated, getAllTodos);
router.get('/:id', isAuthenticated, getTodo);
router.post('/', isAuthenticated, upload.single('file'), createTodo);
router.patch('/:id', isAuthenticated, upload.single('file'), updateTodo);
router.delete('/:id', isAuthenticated, deleteTodo);

export default router;
