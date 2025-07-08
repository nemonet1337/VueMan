import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || '';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN as any };

export interface UserJwtPayload {
  id: number;
  email: string;
  roles: string[];
}

export const signJwt = (payload: UserJwtPayload): string =>
  jwt.sign(payload, JWT_SECRET, signOptions);

export const verifyJwt = (token: string): UserJwtPayload =>
  jwt.verify(token, JWT_SECRET) as UserJwtPayload;
