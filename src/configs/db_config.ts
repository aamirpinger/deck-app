import mongoose from 'mongoose';
import { IDBInput } from '../models/interfaces/db_input.model';

export class DBConfig {
  static connectDB = ({ db }: IDBInput) => {
    try {
      const connect = () => {
        mongoose.connect(db);
        console.info(`Successfully connected to ${db}`);
      };

      connect();

      // mongoose.connection.on('disconnected', connect);
    } catch (e) {
      console.error(`Error connecting to database :`, e);
      process.exit(1);
    }
  };
}
