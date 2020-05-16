import { Schema, model } from 'mongoose';

const schema = Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  secondName: { type: String },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
});

export const Admin = model('Admin', schema);
