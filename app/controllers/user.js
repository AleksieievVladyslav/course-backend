import { Types } from 'mongoose';
import { User } from '../models';
import { encode, createToken } from '../utils';

export const user = {
  post: async (req, res, next) => {
    const {
      email,
      fisrtName = '',
      secondName = '',
      gender = '',
    } = req.body;
    const password = encode(req.body.password);

    const newUser = new User({
      _id: new Types.ObjectId(),
      email,
      fisrtName,
      secondName,
      gender,
      password,
      login: new Types.ObjectId(),
    });

    try {
      const result = await newUser.save();
      result.password = null;
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  get: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await User.findById(id);
      result.password = null;
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await User.deleteOne({ _id: id });
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
      gender = '',
    } = req.query;
    const password = encode(req.body.query);

    try {
      const result = await User.updateOne(
        {
          _id: id
        },
        {
          email,
          fisrtName,
          secondName,
          gender,
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
      const user = await User.findOne({ email, password });
      if (!user) {
        res.status(401).json({ message: 'Auth failed' });
      } else {
        res.status(200).json({ message: 'Auth successed', token: createToken({ id: user._id }) });
      }
    } catch (error) {
      next(error);
    }
  },
};
