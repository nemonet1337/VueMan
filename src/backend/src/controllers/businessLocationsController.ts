import { Request, Response } from 'express';
import pool from '../utils/db';

function success(res: Response, data: any) {
  return res.json({ data, message: 'success' });
}

function error(res: Response, err: any) {
  console.error(err);
  return res.status(500).json({ message: 'internal server error' });
}

export async function getAll(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM m_business_locations');
    return success(res, rows);
  } catch (err) {
    return error(res, err);
  }
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM m_business_locations WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }
    return success(res, rows[0]);
  } catch (err) {
    return error(res, err);
  }
}

export async function create(req: Request, res: Response) {
  const { name, address, business_days, business_hours_start, business_hours_end, is_active } = req.body;
  const query = `INSERT INTO m_business_locations (name, address, business_days, business_hours_start, business_hours_end, is_active)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`;
  const values = [name, address, business_days, business_hours_start, business_hours_end, is_active ?? true];
  try {
    const { rows } = await pool.query(query, values);
    return success(res, rows[0]);
  } catch (err) {
    return error(res, err);
  }
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const fields = ['name', 'address', 'business_days', 'business_hours_start', 'business_hours_end', 'is_active'];
  const sets: string[] = [];
  const values: any[] = [];
  let idx = 1;
  for (const field of fields) {
    const value = (req.body as any)[field];
    if (value !== undefined) {
      sets.push(`${field} = $${idx}`);
      values.push(value);
      idx++;
    }
  }
  if (sets.length === 0) {
    try {
      const { rows } = await pool.query('SELECT * FROM m_business_locations WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'not found' });
      }
      return success(res, rows[0]);
    } catch (err) {
      return error(res, err);
    }
  } else {
    const query = `UPDATE m_business_locations SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
    values.push(id);
    try {
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'not found' });
      }
      return success(res, rows[0]);
    } catch (err) {
      return error(res, err);
    }
  }
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'UPDATE m_business_locations SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }
    return success(res, rows[0]);
  } catch (err) {
    return error(res, err);
  }
}
