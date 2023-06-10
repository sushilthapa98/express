import mongoose from 'mongoose';
import config from '../config';

const RETRY_MAX = 10;
let RETRY_COUNT = 0;

const url = `mongodb://${config.db.host}/${config.db.db}`;
const db = mongoose.connection;

function connect() {
  mongoose
    .connect(url)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch((err) => {
      console.error(err);
    });
}

db.on('disconnected', function () {
  console.log('MongoDB disconnected!');
  if (RETRY_COUNT < RETRY_MAX) {
    RETRY_COUNT++;
    connect();
  }
});

connect();
