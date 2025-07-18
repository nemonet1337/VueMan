import pool from '../utils/db';
import { Position } from '../../shared/types';

export const getPositions = async (): Promise<Position[]> => {
  const result = await pool.query<Position>(
    'SELECT * FROM m_positions WHERE is_active = true ORDER BY id'
  );
  return result.rows;
};

export const getPosition = async (id: number): Promise<Position | null> => {
  const result = await pool.query<Position>(
    'SELECT * FROM m_positions WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createPosition = async (data: {
  name: string;
  description?: string;
  is_active?: boolean;
}): Promise<Position> => {
  const result = await pool.query<Position>(
    'INSERT INTO m_positions (name, description, is_active, created_at, updated_at) VALUES ($1, $2, $3, now(), now()) RETURNING *',
    [data.name, data.description ?? null, data.is_active ?? true]
  );
  return result.rows[0];
};

export const updatePosition = async (
  id: number,
  data: { name?: string; description?: string; is_active?: boolean }
): Promise<Position | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
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

  fields.push(`updated_at = now()`);
  values.push(id);
  const result = await pool.query<Position>(
    `UPDATE m_positions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deletePosition = async (id: number): Promise<Position | null> => {
  const result = await pool.query<Position>(
    'UPDATE m_positions SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
