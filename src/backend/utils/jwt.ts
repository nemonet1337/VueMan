import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../../shared/types';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signJwt = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyJwt = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
