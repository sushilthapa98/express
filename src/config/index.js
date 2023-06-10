import dotenv from 'dotenv';

dotenv.config();

export default {
  debug: process.env.DEBUG || '',
  secret: process.env.SECRET || '-',
  port: parseInt(process.env.PORT || 8000, 10),
  cors: {
    origin: process.env.CORS_ORIGIN || '',
  },
  db: {
    host: process.env.MONGO_HOSTNAME || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    db: process.env.MONGO_DB || 'test',
    username: process.env.MONGO_USERNAME || 'root',
    password: process.env.MONGO_PASSWORD || '',
  },
  cookie: {
    secure: process.env.COOKIE_SECURE || '',
    domain: process.env.COOKIE_DOMAIN || '',
  },
};
