import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const encode = (str) => crypto.pbkdf2Sync(str, 'salt', 10, 128, 'sha512');
export const createToken = (data) => jwt.sign(data, 'secret', { expiresIn: '8h' });