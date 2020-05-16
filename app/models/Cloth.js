import { Schema, model } from 'mongoose';

const schema = Schema({
  _id: Schema.Types.ObjectId,
  time: { type: Number },
  state: { type: String },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

export const Cloth = model('Cloth', schema);
