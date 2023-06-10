import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import { hashPassword } from '../utils/hashing';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours;

export async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(400, 'Username & Password are required.'));
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.verifyPassword(password))) {
    return next(createError(400, 'Invalid credentials.'));
  }

  const token = jwt.sign(user.toPayload(), config.secret, {
    expiresIn: SESSION_DURATION,
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.secure,
    domain: config.domain,
    expires: new Date(Date.now() + SESSION_DURATION),
  });
  res.json({ token });
}

export async function register(req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(createError(400, 'User already exists.'));
  }

  try {
    const pwdHash = await hashPassword(req.body.password);
    user = await User.create({ ...req.body, password: pwdHash });
    const token = jwt.sign(user.toPayload(), config.secret, {
      expiresIn: SESSION_DURATION,
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.secure,
      domain: config.domain,
      expires: new Date(Date.now() + SESSION_DURATION),
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.clearCookie('token').json({ message: 'Logout successful' });
}
