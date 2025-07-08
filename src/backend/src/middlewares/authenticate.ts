import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: number };
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'unauthorized' });

  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number };
    req.user = { id: payload.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'unauthorized' });
  }
}
