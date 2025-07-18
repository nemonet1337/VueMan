import pool from '../utils/db';
import { PositionInput } from '../schemas/positions.schema';

export async function getPositions() {
  const { rows } = await pool.query('SELECT * FROM m_positions WHERE is_active = true ORDER BY id');
  return rows;
}

export async function getPositionById(id: number) {
  const { rows } = await pool.query('SELECT * FROM m_positions WHERE id = $1 AND is_active = true', [id]);
  return rows[0] || null;
}

export async function createPosition(data: PositionInput) {
  const { title } = data;
  const { rows } = await pool.query(
    'INSERT INTO m_positions (title, is_active, created_at, updated_at) VALUES ($1, true, now(), now()) RETURNING *',
    [title]
  );
  return rows[0];
}

export async function updatePosition(id: number, data: Partial<PositionInput>) {
  const { title, is_active } = data;
  const fields = [] as string[];
  const values: any[] = [];
  let idx = 1;
  if (title !== undefined) {
    fields.push(`title = $${idx++}`);
    values.push(title);
  }
  if (is_active !== undefined) {
    fields.push(`is_active = $${idx++}`);
    values.push(is_active);
  }
  fields.push(`updated_at = now()`);
  values.push(id);
  const { rows } = await pool.query(
    `UPDATE m_positions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return rows[0] || null;
}

export async function deletePosition(id: number) {
  const { rows } = await pool.query(
    'UPDATE m_positions SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0] || null;
}
