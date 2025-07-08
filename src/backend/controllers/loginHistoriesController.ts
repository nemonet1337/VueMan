import { RequestHandler } from 'express';
import pool from '../utils/db';
import { AuthRequest } from '../utils/auth';

export const createLoginHistory: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const userId = req.user!.id;
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'] || '';

    await pool.query(
      'INSERT INTO t_login_histories (user_id, ip_address, user_agent) VALUES ($1, $2, $3)',
      [userId, ipAddress, userAgent]
    );

    res.json({ message: 'login history recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal error' });
  }
};

export const getMyLoginHistories: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const userId = req.user!.id;
    const { rows } = await pool.query(
      'SELECT id, user_id, login_at, ip_address, user_agent, created_at FROM t_login_histories WHERE user_id = $1 ORDER BY login_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal error' });
  }
};
