import bcrypt from 'bcrypt';
import pool from '../utils/db';
import { User } from '../../shared/types';

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query<User>(
    'SELECT id, email, created_at FROM m_users ORDER BY id'
  );
  return result.rows;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query<User>(
    'SELECT id, email, created_at FROM m_users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query<User>(
    'INSERT INTO m_users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, passwordHash]
  );
  return result.rows[0];
};

export const updateUser = async (
  id: string,
  data: { email?: string }
): Promise<User | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(data.email);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);

  const result = await pool.query<User>(
    `UPDATE m_users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, email, created_at`,
    values
  );

  return result.rows[0] || null;
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const result = await pool.query<User>(
    'DELETE FROM m_users WHERE id = $1 RETURNING id, email, created_at',
    [id]
  );
  return result.rows[0] || null;
};
