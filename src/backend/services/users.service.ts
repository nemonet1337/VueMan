import bcrypt from 'bcrypt';
import pool from '../utils/db';
import { User } from '../../shared/types';

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query<User>(
    'SELECT id, email, roles, is_active, created_at, updated_at FROM m_users WHERE is_active = true ORDER BY id'
  );
  return result.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query<User>(
    'SELECT id, email, roles, is_active, created_at, updated_at FROM m_users WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createUser = async (
  email: string,
  password: string,
  roles: string[]
): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query<User>(
    'INSERT INTO m_users (email, password_hash, roles, is_active, created_at, updated_at) VALUES ($1, $2, $3, true, now(), now()) RETURNING id, email, roles, is_active, created_at, updated_at',
    [email, passwordHash, roles]
  );
  return result.rows[0];
};

export const updateUser = async (
  id: number,
  data: { email?: string; roles?: string[] }
): Promise<User | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(data.email);
  }
  if (data.roles !== undefined) {
    fields.push(`roles = $${idx++}`);
    values.push(data.roles);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push('updated_at = now()');
  values.push(id);

  const result = await pool.query<User>(
    `UPDATE m_users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, email, roles, is_active, created_at, updated_at`,
    values
  );

  return result.rows[0] || null;
};

export const deleteUser = async (id: number): Promise<User | null> => {
  const result = await pool.query<User>(
    'UPDATE m_users SET is_active = false, updated_at = now() WHERE id = $1 RETURNING id, email, roles, is_active, created_at, updated_at',
    [id]
  );
  return result.rows[0] || null;
};
