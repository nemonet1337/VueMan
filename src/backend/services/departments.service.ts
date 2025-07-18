import pool from '../utils/db';
import { Department } from '../../shared/types';

export const getDepartments = async (): Promise<Department[]> => {
  const result = await pool.query<Department>(
    'SELECT * FROM m_departments WHERE is_active = true ORDER BY id'
  );
  return result.rows;
};

export const getDepartment = async (id: number): Promise<Department | null> => {
  const result = await pool.query<Department>(
    'SELECT * FROM m_departments WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createDepartment = async (data: {
  department_code: string;
  name: string;
  office_id: number;
  is_active?: boolean;
}): Promise<Department> => {
  const { department_code, name, office_id, is_active } = data;
  const result = await pool.query<Department>(
    'INSERT INTO m_departments (department_code, name, office_id, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *',
    [department_code, name, office_id, is_active ?? true]
  );
  return result.rows[0];
};

export const updateDepartment = async (
  id: number,
  data: {
    department_code?: string;
    name?: string;
    office_id?: number;
    is_active?: boolean;
  }
): Promise<Department | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.department_code !== undefined) {
    fields.push(`department_code = $${idx++}`);
    values.push(data.department_code);
  }
  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.office_id !== undefined) {
    fields.push(`office_id = $${idx++}`);
    values.push(data.office_id);
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

  const result = await pool.query<Department>(
    `UPDATE m_departments SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteDepartment = async (id: number): Promise<Department | null> => {
  const result = await pool.query<Department>(
    'UPDATE m_departments SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
