import { Types } from 'mongoose';
import { Organization } from '../models';

export const organization = {
  post: async (req, res, next) => {
    const { name, address = '' } = req.body;
  
    const newOrg = new Organization({ _id: new Types.ObjectId(), name, address });
    try {
      const result = await newOrg.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    const { company } = req.params;

    try {
      const result = await Organization.findById(company);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const { company } = req.params;

    try {
      const result = await Organization.deleteOne({ _id: company });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const { company } = req.params;
    const { name, address } = req.query;

    try {
      const result = await Organization.updateOne({ _id: company }, { name, address });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
