import pool from '../utils/db';
import { Position } from '../../shared/types';

export const getPositions = async (): Promise<Position[]> => {
  const result = await pool.query<Position>(
    'SELECT id, title FROM m_positions ORDER BY id'
  );
  return result.rows;
};

export const getPosition = async (id: string): Promise<Position | null> => {
  const result = await pool.query<Position>(
    'SELECT id, title FROM m_positions WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createPosition = async (data: { title: string }): Promise<Position> => {
  const result = await pool.query<Position>(
    'INSERT INTO m_positions (title) VALUES ($1) RETURNING id, title',
    [data.title]
  );
  return result.rows[0];
};

export const updatePosition = async (
  id: string,
  data: { title?: string }
): Promise<Position | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.title !== undefined) {
    fields.push(`title = $${idx++}`);
    values.push(data.title);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  const result = await pool.query<Position>(
    `UPDATE m_positions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, title`,
    values
  );
  return result.rows[0] || null;
};

export const deletePosition = async (id: string): Promise<Position | null> => {
  const result = await pool.query<Position>(
    'DELETE FROM m_positions WHERE id = $1 RETURNING id, title',
    [id]
  );
  return result.rows[0] || null;
};
