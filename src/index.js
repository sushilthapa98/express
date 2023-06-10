import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import config from './config';
import { UseRoutes } from './routes';
import './services/db';

const app = express();

app.use(
  cors({
    origin: config.cors.origin,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

if (config.debug) {
  app.use(logger('dev'));
}

UseRoutes(app);

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  console.info(`📣 Server listening on port: ${config.port}`);
});
