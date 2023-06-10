import Todo from '../models/Todo';
import createError from 'http-errors';

export async function getAllTodos(req, res) {
  const todo = await Todo.find({ user: req.user.id });
  res.json(todo);
}

export async function getTodo(req, res, next) {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  if (!todo) {
    return next(createError(404));
  }
  res.json(todo);
}

export async function createTodo(req, res, next) {
  try {
    const todo = await Todo.create({ ...req.body, user: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req, res, next) {
  let todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  if (!todo) {
    return next(createError(404));
  }
  try {
    todo = await Todo.findByIdAndUpdate(todo._id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(req, res, next) {
  let todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  if (!todo) {
    return next(createError(404));
  }
  todo = await Todo.deleteOne({ _id: todo._id });
  if (!todo.deletedCount) {
    return next(createError(500, 'Failed to delete todo'));
  }
  res.json({ message: 'Todo Deleted' });
}
