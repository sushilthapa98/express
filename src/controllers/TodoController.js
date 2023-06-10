import Todo from '../models/Todo';
import createError from 'http-errors';
import { unlink } from '../utils/file';

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
    const data = {
      ...req.body,
      user: req.user.id,
    };
    if (req.file) {
      data.file = req.file.path;
    }
    const todo = await Todo.create(data);
    res.status(201).json(todo);
  } catch (err) {
    unlink(req.file?.path);
    next(err);
  }
}

export async function updateTodo(req, res, next) {
  let todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  if (!todo) {
    unlink(req.file?.path);
    return next(createError(404));
  }
  try {
    const oldFile = todo.file;
    const data = {
      ...req.body,
      user: req.user.id,
    };
    if (req.file) {
      data.file = req.file.path;
    }
    todo = await Todo.findByIdAndUpdate(todo._id, data, {
      runValidators: true,
      new: true,
    });
    unlink(oldFile);
    res.json(todo);
  } catch (err) {
    unlink(req.file?.path);
    next(err);
  }
}

export async function deleteTodo(req, res, next) {
  let todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  if (!todo) {
    return next(createError(404));
  }
  const oldFile = todo.file;
  todo = await Todo.deleteOne({ _id: todo._id });
  if (!todo.deletedCount) {
    return next(createError(500, 'Failed to delete todo'));
  }
  unlink(oldFile);
  res.json({ message: 'Todo Deleted' });
}
