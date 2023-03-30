import mongoose from 'mongoose';

import * as dotenv from 'dotenv'
dotenv.config()

const dbName = process.env.DB_TEST || 'prepd';
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

const dbConnection = mongoose.connect(`${dbURL}`, {});

export {mongoose, dbConnection};
