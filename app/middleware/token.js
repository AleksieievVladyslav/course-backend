import jwt from 'jsonwebtoken';

export const releaseToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, 'secret');
    req.params.id = decoded.id;
    req.params.company = decoded.company;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed' });
  }
};