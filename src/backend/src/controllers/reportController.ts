import { Request, Response } from 'express';
import pool from '../utils/db';

export async function getDailyReport(req: Request, res: Response) {
  const { employee_id, date } = req.query;
  if (!employee_id || !date) return res.status(400).json({ message: 'missing parameters' });
  try {
    const result = await pool.query(
      `SELECT * FROM t_attendance_summaries WHERE employee_id=$1 AND summary_date=$2 AND summary_type='daily'`,
      [employee_id, date]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'no summary found' });
    res.json({ data: result.rows[0], message: 'success' });
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
}

export async function getMonthlyReport(req: Request, res: Response) {
  const { employee_id, month } = req.query;
  if (!employee_id || !month) return res.status(400).json({ message: 'missing parameters' });
  const firstDay = `${month}-01`;
  try {
    const result = await pool.query(
      `SELECT * FROM t_attendance_summaries WHERE employee_id=$1 AND summary_date=$2 AND summary_type='monthly'`,
      [employee_id, firstDay]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'no summary found' });
    res.json({ data: result.rows[0], message: 'success' });
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
}

export async function getOfficeSummary(req: Request, res: Response) {
  const { office_id, date } = req.query;
  if (!office_id || !date) return res.status(400).json({ message: 'missing parameters' });
  try {
    const result = await pool.query(
      `SELECT tas.* FROM t_attendance_summaries tas JOIN m_employees e ON tas.employee_id=e.id WHERE e.office_id=$1 AND tas.summary_date=$2 AND tas.summary_type='daily'`,
      [office_id, date]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'no summary found' });
    res.json({ data: result.rows, message: 'success' });
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
}

export async function recalculateReport(req: Request, res: Response) {
  const { employee_id, date } = req.body;
  if (!employee_id || !date) return res.status(400).json({ message: 'missing parameters' });
  try {
    await pool.query(
      `DELETE FROM t_attendance_summaries WHERE employee_id=$1 AND summary_date=$2 AND summary_type='daily'`,
      [employee_id, date]
    );
    const insert = await pool.query(
      `INSERT INTO t_attendance_summaries (employee_id, summary_date, summary_type, total_work_minutes, total_break_minutes, is_auto_generated) VALUES ($1,$2,'daily',0,0,false) RETURNING *`,
      [employee_id, date]
    );
    res.json({ data: insert.rows[0], message: 'success' });
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
}
