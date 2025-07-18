import pool from '../utils/db';
import { Employee } from '../../shared/types';

export const getEmployees = async (): Promise<Employee[]> => {
  const result = await pool.query<Employee>(
    'SELECT * FROM m_employees ORDER BY id'
  );
  return result.rows;
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  const result = await pool.query<Employee>(
    'SELECT * FROM m_employees WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createEmployee = async (
  data: {
    employee_code: string;
    full_name: string;
    email: string;
    hire_date: string;
    is_active?: boolean;
  }
): Promise<Employee> => {
  const { employee_code, full_name, email, hire_date, is_active = true } = data;
  const result = await pool.query<Employee>(
    'INSERT INTO m_employees (employee_code, full_name, email, hire_date, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now()) RETURNING *',
    [employee_code, full_name, email, hire_date, is_active]
  );
  return result.rows[0];
};

export const updateEmployee = async (
  id: number,
  data: {
    employee_code?: string;
    full_name?: string;
    email?: string;
    hire_date?: string;
    is_active?: boolean;
  }
): Promise<Employee | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.employee_code !== undefined) {
    fields.push(`employee_code = $${idx++}`);
    values.push(data.employee_code);
  }
  if (data.full_name !== undefined) {
    fields.push(`full_name = $${idx++}`);
    values.push(data.full_name);
  }
  if (data.email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(data.email);
  }
  if (data.hire_date !== undefined) {
    fields.push(`hire_date = $${idx++}`);
    values.push(data.hire_date);
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

  const result = await pool.query<Employee>(
    `UPDATE m_employees SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteEmployee = async (id: number): Promise<Employee | null> => {
  const result = await pool.query<Employee>(
    'UPDATE m_employees SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
