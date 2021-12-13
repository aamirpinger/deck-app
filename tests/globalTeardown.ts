import 'dotenv/config.js';

import mongoose from 'mongoose';
import { configServer } from './../src/server';

export default async () => {
  const { MONGO_URL } = process.env;
  configServer(`${MONGO_URL}test_db`);

  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close();
  });
};
