import createError from 'http-errors';
import errorHandler from '../middlewares/errorHandler';
import todoRouter from './todos';
import authRouter from './auth';

function UseRoutes(app) {
  // auth
  app.use('/auth', authRouter);

  // users
  app.use('/todos', todoRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(errorHandler);
}

export { UseRoutes };
