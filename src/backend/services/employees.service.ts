import pool from '../utils/db';
import { Employee } from '../../shared/types';

export const getEmployees = async (): Promise<Employee[]> => {
  const result = await pool.query<Employee>(
    'SELECT id, user_id, name, office_id, position_id, work_pattern_id, status, hired_at FROM m_employees ORDER BY id'
  );
  return result.rows;
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const result = await pool.query<Employee>(
    'SELECT id, user_id, name, office_id, position_id, work_pattern_id, status, hired_at FROM m_employees WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createEmployee = async (
  data: {
    user_id?: string | null;
    name: string;
    office_id: string;
    position_id: string;
    work_pattern_id: string;
    status?: string;
    hired_at?: string | null;
  }
): Promise<Employee> => {
  const {
    user_id = null,
    name,
    office_id,
    position_id,
    work_pattern_id,
    status = 'active',
    hired_at = null,
  } = data;
  const result = await pool.query<Employee>(
    'INSERT INTO m_employees (user_id, name, office_id, position_id, work_pattern_id, status, hired_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, name, office_id, position_id, work_pattern_id, status, hired_at',
    [user_id, name, office_id, position_id, work_pattern_id, status, hired_at]
  );
  return result.rows[0];
};

export const updateEmployee = async (
  id: string,
  data: {
    user_id?: string | null;
    name?: string;
    office_id?: string;
    position_id?: string;
    work_pattern_id?: string;
    status?: string;
    hired_at?: string | null;
  }
): Promise<Employee | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.user_id !== undefined) {
    fields.push(`user_id = $${idx++}`);
    values.push(data.user_id);
  }
  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.office_id !== undefined) {
    fields.push(`office_id = $${idx++}`);
    values.push(data.office_id);
  }
  if (data.position_id !== undefined) {
    fields.push(`position_id = $${idx++}`);
    values.push(data.position_id);
  }
  if (data.work_pattern_id !== undefined) {
    fields.push(`work_pattern_id = $${idx++}`);
    values.push(data.work_pattern_id);
  }
  if (data.status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(data.status);
  }
  if (data.hired_at !== undefined) {
    fields.push(`hired_at = $${idx++}`);
    values.push(data.hired_at);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);

  const result = await pool.query<Employee>(
    `UPDATE m_employees SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, user_id, name, office_id, position_id, work_pattern_id, status, hired_at`,
    values
  );
  return result.rows[0] || null;
};

export const deleteEmployee = async (id: string): Promise<Employee | null> => {
  const result = await pool.query<Employee>(
    'DELETE FROM m_employees WHERE id = $1 RETURNING id, user_id, name, office_id, position_id, work_pattern_id, status, hired_at',
    [id]
  );
  return result.rows[0] || null;
};
