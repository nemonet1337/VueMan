import { Request, Response, NextFunction } from 'express';
import { verifyJwt, UserJwtPayload } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: UserJwtPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
};
