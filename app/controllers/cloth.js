import { Types } from 'mongoose';
import { Cloth } from '../models';

export const cloth = {
  post: async (req, res, next) => {
    const { category, state } = req.body;
    const { company } = req.params;

    const newCloth = new Cloth({
      _id: new Types.ObjectId(),
      time: new Date().getTime(),
      state,
      company,
      category,
    });

    try {
      const result = await newCloth.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  getAllByOrganization: async (req, res, next) => {
    const { company } = req.params;

    try {
      const result = await Cloth.find({ company });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  getAllByUser: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Cloth.find({ user: id });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  get: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Cloth.findById(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const { clothId, company } = req.params;

    try {
      const result = await Cloth.deleteOne({ _id: clothId, company });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    const { clothId, company } = req.params;
    const {
      state,
      category,
      user,
    } = req.body;

    let resUser = user;
    if (user === '') resUser = null;

    try {
      const result = await Cloth.updateOne(
        {
          _id: clothId,
          company,
        },
        {
          time: new Date().getTime(),
          state,
          category,
          user: resUser,
        },
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  updateState: async (req, res, next) => {
    const { clothId } = req.params;
    const { state } = req.body;

    try {
      const result = await Cloth.updateOne(
        {
          _id: clothId,
        },
        {
          time: new Date().getTime(),
          state,
        },
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};
