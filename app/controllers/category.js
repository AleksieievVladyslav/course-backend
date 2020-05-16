import { Types } from 'mongoose';
import { Category } from '../models';

export const category = {
  post: async (req, res, next) => {
    const { name, method = '' } = req.body;

    const newCat = new Category({ _id: new Types.ObjectId(), name, method });
    try {
      const result = await newCat.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Category.findById(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await Category.find();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Category.deleteOne({ _id: id });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, method } = req.query;

    try {
      const result = await Category.updateOne({ _id: id }, { name, method });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
