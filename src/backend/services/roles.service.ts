import pool from '../utils/db';
import { Role } from '../../shared/types';

export const getRoles = async (): Promise<Role[]> => {
  const result = await pool.query<Role>(
    'SELECT id, name FROM m_roles ORDER BY id'
  );
  return result.rows;
};

export const getRoleById = async (id: string): Promise<Role | null> => {
  const result = await pool.query<Role>(
    'SELECT id, name FROM m_roles WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createRole = async (data: { name: string }): Promise<Role> => {
  const result = await pool.query<Role>(
    'INSERT INTO m_roles (name) VALUES ($1) RETURNING id, name',
    [data.name]
  );
  return result.rows[0];
};

export const updateRole = async (
  id: string,
  data: { name?: string }
): Promise<Role | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  const result = await pool.query<Role>(
    `UPDATE m_roles SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name`,
    values
  );
  return result.rows[0] || null;
};

export const deleteRole = async (id: string): Promise<Role | null> => {
  const result = await pool.query<Role>(
    'DELETE FROM m_roles WHERE id = $1 RETURNING id, name',
    [id]
  );
  return result.rows[0] || null;
};
