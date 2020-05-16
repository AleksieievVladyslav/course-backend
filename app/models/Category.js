import { Schema, model } from 'mongoose';

const schema = Schema({
  _id: Schema.Types.ObjectId, 
  name: { type: String },
  method: { type: String },
});

export const Category = model('Category', schema);