import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'missing authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid token' });
  }
}
