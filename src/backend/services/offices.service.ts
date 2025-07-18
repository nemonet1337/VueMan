import pool from '../utils/db';
import { Office } from '../../shared/types/offices';

export const getOffices = async (): Promise<Office[]> => {
  const result = await pool.query<Office>(
    'SELECT id, name, address, open_time, close_time FROM m_offices ORDER BY id'
  );
  return result.rows;
};

export const getOfficeById = async (id: string): Promise<Office | null> => {
  const result = await pool.query<Office>(
    'SELECT id, name, address, open_time, close_time FROM m_offices WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createOffice = async (
  data: { name: string; address?: string | null; open_time?: string | null; close_time?: string | null }
): Promise<Office> => {
  const { name, address = null, open_time = null, close_time = null } = data;
  const result = await pool.query<Office>(
    'INSERT INTO m_offices (name, address, open_time, close_time) VALUES ($1, $2, $3, $4) RETURNING id, name, address, open_time, close_time',
    [name, address, open_time, close_time]
  );
  return result.rows[0];
};

export const updateOffice = async (
  id: string,
  data: { name?: string; address?: string | null; open_time?: string | null; close_time?: string | null }
): Promise<Office | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.address !== undefined) {
    fields.push(`address = $${idx++}`);
    values.push(data.address);
  }
  if (data.open_time !== undefined) {
    fields.push(`open_time = $${idx++}`);
    values.push(data.open_time);
  }
  if (data.close_time !== undefined) {
    fields.push(`close_time = $${idx++}`);
    values.push(data.close_time);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  const result = await pool.query<Office>(
    `UPDATE m_offices SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, address, open_time, close_time`,
    values
  );
  return result.rows[0] || null;
};

export const deleteOffice = async (id: string): Promise<Office | null> => {
  const result = await pool.query<Office>(
    'DELETE FROM m_offices WHERE id = $1 RETURNING id, name, address, open_time, close_time',
    [id]
  );
  return result.rows[0] || null;
};
