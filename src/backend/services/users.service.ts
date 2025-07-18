import bcrypt from 'bcrypt';
import pool from '../utils/db';
import { User } from '../../shared/types';

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query<User>(
    'SELECT id, email, roles FROM m_users ORDER BY id'
  );
  return result.rows;
};

export const createUser = async (
  email: string,
  password: string,
  roles: string[]
): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query<User>(
    'INSERT INTO m_users (email, password_hash, roles) VALUES ($1, $2, $3) RETURNING id, email, roles',
    [email, passwordHash, roles]
  );
  return result.rows[0];
};

export const updateUser = async (
  id: number,
  data: { email?: string; password?: string; roles?: string[] }
): Promise<User | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(data.email);
  }
  if (data.password !== undefined) {
    const hash = await bcrypt.hash(data.password, 10);
    fields.push(`password_hash = $${idx++}`);
    values.push(hash);
  }
  if (data.roles !== undefined) {
    fields.push(`roles = $${idx++}`);
    values.push(data.roles);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  const result = await pool.query<User>(
    `UPDATE m_users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, email, roles`,
    values
  );

  return result.rows[0] || null;
};

export const deleteUser = async (id: number): Promise<User | null> => {
  const result = await pool.query<User>(
    'DELETE FROM m_users WHERE id = $1 RETURNING id, email, roles',
    [id]
  );
  return result.rows[0] || null;
};
