import pool from '../utils/db';
import { Office } from '../../shared/types/offices';

export const getOffices = async (): Promise<Office[]> => {
  const result = await pool.query<Office>(
    'SELECT * FROM m_offices WHERE is_active = true ORDER BY id'
  );
  return result.rows;
};

export const getOfficeById = async (id: number): Promise<Office | null> => {
  const result = await pool.query<Office>(
    'SELECT * FROM m_offices WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createOffice = async (
  data: { name: string; location: string }
): Promise<Office> => {
  const { name, location } = data;
  const result = await pool.query<Office>(
    'INSERT INTO m_offices (name, location, is_active, created_at, updated_at) VALUES ($1, $2, true, now(), now()) RETURNING *',
    [name, location]
  );
  return result.rows[0];
};

export const updateOffice = async (
  id: number,
  data: { name?: string; location?: string }
): Promise<Office | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.location !== undefined) {
    fields.push(`location = $${idx++}`);
    values.push(data.location);
  }
  if (fields.length === 0) {
    return null;
  }

  fields.push('updated_at = now()');
  values.push(id);

  const result = await pool.query<Office>(
    `UPDATE m_offices SET ${fields.join(', ')} WHERE id = $${idx} AND is_active = true RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteOffice = async (id: number): Promise<Office | null> => {
  const result = await pool.query<Office>(
    'UPDATE m_offices SET is_active = false, updated_at = now() WHERE id = $1 AND is_active = true RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
