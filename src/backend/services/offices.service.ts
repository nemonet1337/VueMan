import pool from '../utils/db';
import { Office } from '../../shared/types';

export const getOffices = async (): Promise<Office[]> => {
  const result = await pool.query<Office>(
    'SELECT * FROM m_offices ORDER BY id'
  );
  return result.rows;
};

export const getOfficeById = async (id: number): Promise<Office | null> => {
  const result = await pool.query<Office>(
    'SELECT * FROM m_offices WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createOffice = async (
  data: { name: string; location: string; is_active?: boolean }
): Promise<Office> => {
  const { name, location, is_active = true } = data;
  const result = await pool.query<Office>(
    'INSERT INTO m_offices (name, location, is_active, created_at, updated_at) VALUES ($1, $2, $3, now(), now()) RETURNING *',
    [name, location, is_active]
  );
  return result.rows[0];
};

export const updateOffice = async (
  id: number,
  data: { name?: string; location?: string; is_active?: boolean }
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
  if (data.is_active !== undefined) {
    fields.push(`is_active = $${idx++}`);
    values.push(data.is_active);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push('updated_at = now()');
  values.push(id);

  const result = await pool.query<Office>(
    `UPDATE m_offices SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteOffice = async (id: number): Promise<Office | null> => {
  const result = await pool.query<Office>(
    'UPDATE m_offices SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
