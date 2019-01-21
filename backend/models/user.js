import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: {
    email: String,
    password: String,
  }
});

export default userSchema;