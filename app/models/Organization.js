import { Schema, model } from 'mongoose';

const schema = Schema({
  _id: Schema.Types.ObjectId, 
  name: { type: String, required: true, unique: true },
  address: { type: String }
});

export const Organization = model('Organization', schema);