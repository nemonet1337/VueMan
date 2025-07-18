import pool from '../utils/db';
import { WorkPattern } from '../../shared/types';

export const getWorkPatterns = async (): Promise<WorkPattern[]> => {
  const result = await pool.query<WorkPattern>(
    'SELECT * FROM m_work_patterns WHERE is_active = true ORDER BY id'
  );
  return result.rows;
};

export const getWorkPattern = async (id: number): Promise<WorkPattern | null> => {
  const result = await pool.query<WorkPattern>(
    'SELECT * FROM m_work_patterns WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createWorkPattern = async (data: {
  pattern_code: string;
  name: string;
  start_time: string;
  end_time: string;
  break_minutes: number;
  is_active?: boolean;
}): Promise<WorkPattern> => {
  const { pattern_code, name, start_time, end_time, break_minutes, is_active } = data;
  const result = await pool.query<WorkPattern>(
    'INSERT INTO m_work_patterns (pattern_code, name, start_time, end_time, break_minutes, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, now(), now()) RETURNING *',
    [pattern_code, name, start_time, end_time, break_minutes, is_active ?? true]
  );
  return result.rows[0];
};

export const updateWorkPattern = async (
  id: number,
  data: {
    pattern_code?: string;
    name?: string;
    start_time?: string;
    end_time?: string;
    break_minutes?: number;
    is_active?: boolean;
  }
): Promise<WorkPattern | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.pattern_code !== undefined) {
    fields.push(`pattern_code = $${idx++}`);
    values.push(data.pattern_code);
  }
  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.start_time !== undefined) {
    fields.push(`start_time = $${idx++}`);
    values.push(data.start_time);
  }
  if (data.end_time !== undefined) {
    fields.push(`end_time = $${idx++}`);
    values.push(data.end_time);
  }
  if (data.break_minutes !== undefined) {
    fields.push(`break_minutes = $${idx++}`);
    values.push(data.break_minutes);
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

  const result = await pool.query<WorkPattern>(
    `UPDATE m_work_patterns SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteWorkPattern = async (id: number): Promise<WorkPattern | null> => {
  const result = await pool.query<WorkPattern>(
    'UPDATE m_work_patterns SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
