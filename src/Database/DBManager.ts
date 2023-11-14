import mongoose from 'mongoose';
import logger from '../utils/logger.js';

// eslint-disable-next-line
export const Connect = () =>
  new Promise<void>(async (resolve, reject) => {
    mongoose
      .connect(process.env.DBURL!)
      .then(() => resolve())
      .catch(err => reject(err));
  });
