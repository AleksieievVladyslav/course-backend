import { Types } from 'mongoose';
import { Admin } from '../models';
import { encode, createToken } from '../utils';

export const admin = {
  post: async (req, res, next) => {
    const {
      email,
      fisrtName = '',
      secondName = '',
      company
    } = req.body;
    const password = encode(req.body.password);

    const newAdmin = new Admin({
      _id: new Types.ObjectId(),
      email,
      fisrtName,
      secondName,
      company,
      password
    });

    try {
      const result = await newAdmin.save();
      result.password = null;
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  get: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Admin.findById(id);
      result.password = null;
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Admin.deleteOne({ _id: id });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const {
      email,
      fisrtName = '',
      secondName = '',
    } = req.query;
    const password = encode(req.body.query);

    try {
      const result = await Admin.updateOne(
        {
          _id: id
        },
        {
          email,
          fisrtName,
          secondName,
          password,
        },
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    const { email } = req.body;
    const password = encode(req.body.password);
  
    try {
      const admin = await Admin.findOne({ email, password });
      if (!admin) {
        res.status(401).json({ message: 'Auth failed' });
      } else {
        res.status(200).json({ message: 'Auth successed', token: createToken({ id: admin._id, company: admin.company }) });
      }
    } catch (error) {
      next(error);
    }
  },
};
