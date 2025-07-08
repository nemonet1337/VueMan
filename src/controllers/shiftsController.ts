import { Request, Response } from 'express';
import pool from '../utils/db';

export async function getShifts(req: Request, res: Response) {
  const { employee_id, date, office_id, month } = req.query;

  try {
    if (employee_id && date) {
      const result = await pool.query(
        `SELECT * FROM t_shift_assignments WHERE employee_id = $1 AND work_date = $2`,
        [employee_id, date]
      );
      return res.json({ data: result.rows[0] || null, message: 'success' });
    }

    if (office_id && month) {
      const result = await pool.query(
        `SELECT * FROM t_shift_assignments WHERE office_id = $1 AND to_char(work_date, 'YYYY-MM') = $2 ORDER BY work_date`,
        [office_id, month]
      );
      return res.json({ data: result.rows, message: 'success' });
    }

    return res.status(400).json({ message: 'invalid query parameters' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'internal server error' });
  }
}

export async function createShift(req: Request, res: Response) {
  const { employee_id, office_id, work_date, start_time, end_time, break_minutes, remarks } = req.body;

  if (!employee_id || !office_id || !work_date || !start_time || !end_time) {
    return res.status(400).json({ message: 'missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO t_shift_assignments (employee_id, office_id, work_date, start_time, end_time, break_minutes, remarks)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [employee_id, office_id, work_date, start_time, end_time, break_minutes ?? 0, remarks ?? null]
    );
    return res.status(201).json({ data: result.rows[0], message: 'success' });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'duplicate shift found' });
    }
    console.error(err);
    return res.status(500).json({ message: 'internal server error' });
  }
}

export async function updateShift(req: Request, res: Response) {
  const id = req.params.id;
  const { employee_id, office_id, work_date, start_time, end_time, break_minutes, remarks } = req.body;

  if (!employee_id || !office_id || !work_date || !start_time || !end_time) {
    return res.status(400).json({ message: 'missing required fields' });
  }

  try {
    const result = await pool.query(
      `UPDATE t_shift_assignments
       SET employee_id=$1, office_id=$2, work_date=$3, start_time=$4, end_time=$5, break_minutes=$6, remarks=$7, updated_at=now()
       WHERE id=$8 RETURNING *`,
      [employee_id, office_id, work_date, start_time, end_time, break_minutes ?? 0, remarks ?? null, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ message: 'not found' });

    return res.json({ data: result.rows[0], message: 'success' });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'duplicate shift found' });
    }
    console.error(err);
    return res.status(500).json({ message: 'internal server error' });
  }
}

export async function deleteShift(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM t_shift_assignments WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'not found' });
    return res.json({ data: null, message: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'internal server error' });
  }
}
