import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../utils/db';
import { signJwt } from '../utils/jwt';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const query =
    'SELECT id, email, password_hash, roles FROM m_users WHERE email = $1';
  const { rows } = await db.query(query, [email]);
  const user = rows[0];

  if (!user) {
    res.status(401).json({ message: 'Email または Password が不正です' });
    return;
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    res.status(401).json({ message: 'Email または Password が不正です' });
    return;
  }

  const token = signJwt({ id: user.id, email: user.email, roles: user.roles });

  res.json({ token });
};

export const getMe = (req: AuthenticatedRequest, res: Response) => {
  res.json(req.user);
};
