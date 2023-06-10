const errorHandler = (err, req, res, next) => {
  // JWT validation error
  if (err.code === 'permission_denied') {
    res.status(403).json({
      error: err.message || 'authentication error',
    });
    return next();
  }

  // Auth header not set error
  if (err.code === 'user_object_not_found') {
    res.status(401).json({
      error: 'Authorization header not found',
    });
    return next();
  }

  // Token expired error
  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      error: 'Token expired',
    });
    return next();
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const error = `Invalid ${err.kind}`;
    res.status(400).json({ error });
    return next();
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    let errors = {};
    let key = Object.keys(err.keyPattern)[0];

    errors[key] = `${key} already exists`;
    res.status(400).json({ errors });
    return next();
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    res.status(400).json({ errors });
    return next();
  }

  // default Error handler
  res.status(err.statusCode || 500).json({
    error: err.message || 'Server Error',
  });

  return next();
};

export default errorHandler;
