import { Schema, model } from 'mongoose';

const schema = Schema({
  _id: Schema.Types.ObjectId,
  firstName: { type: String },
  secondName: { type: String },
  gender: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  login: Schema.Types.ObjectId,
});

export const User = model('User', schema);