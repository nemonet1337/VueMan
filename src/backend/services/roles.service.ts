import pool from '../utils/db';
import { Role } from '../../shared/types';

export const getRoles = async (): Promise<Role[]> => {
  const result = await pool.query<Role>(
    'SELECT * FROM m_roles WHERE is_active = true ORDER BY id'
  );
  return result.rows;
};

export const getRoleById = async (id: number): Promise<Role | null> => {
  const result = await pool.query<Role>(
    'SELECT * FROM m_roles WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createRole = async (
  data: { role_name: string; description?: string; is_active?: boolean }
): Promise<Role> => {
  const result = await pool.query<Role>(
    'INSERT INTO m_roles (role_name, description, is_active, created_at, updated_at) VALUES ($1, $2, $3, now(), now()) RETURNING *',
    [data.role_name, data.description ?? null, data.is_active ?? true]
  );
  return result.rows[0];
};

export const updateRole = async (
  id: number,
  data: { role_name?: string; description?: string; is_active?: boolean }
): Promise<Role | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.role_name !== undefined) {
    fields.push(`role_name = $${idx++}`);
    values.push(data.role_name);
  }
  if (data.description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(data.description);
  }
  if (data.is_active !== undefined) {
    fields.push(`is_active = $${idx++}`);
    values.push(data.is_active);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push('updated_at = now()');
  values.push(id);

  const result = await pool.query<Role>(
    `UPDATE m_roles SET ${fields.join(', ')} WHERE id = $${idx} AND is_active = true RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteRole = async (id: number): Promise<Role | null> => {
  const result = await pool.query<Role>(
    'UPDATE m_roles SET is_active = false, updated_at = now() WHERE id = $1 AND is_active = true RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
