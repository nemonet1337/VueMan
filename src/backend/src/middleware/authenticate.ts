import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
