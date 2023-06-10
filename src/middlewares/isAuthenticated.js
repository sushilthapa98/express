import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../config';

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(' ')[1];

  if (!token && req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(createError(401));
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(createError(403, 'Invalid token'));
    }

    req.user = decoded;
    next();
  });
};

export default isAuthenticated;
