import mongoose from 'mongoose';

export default mongoose.createConnection(process.env.DB_URL, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
