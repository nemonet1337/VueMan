import pool from '../utils/db';
import { AttendanceSummary } from '../../shared/types';

export const getAttendanceSummaries = async (filters: {
  employee_id?: number;
  start_date?: string;
  end_date?: string;
} = {}): Promise<AttendanceSummary[]> => {
  const conditions: string[] = ['is_active = true'];
  const values: any[] = [];
  let idx = 1;

  if (filters.employee_id !== undefined) {
    conditions.push(`employee_id = $${idx++}`);
    values.push(filters.employee_id);
  }
  if (filters.start_date !== undefined) {
    conditions.push(`summary_date >= $${idx++}`);
    values.push(filters.start_date);
  }
  if (filters.end_date !== undefined) {
    conditions.push(`summary_date <= $${idx++}`);
    values.push(filters.end_date);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query<AttendanceSummary>(
    `SELECT * FROM t_attendance_summaries ${where} ORDER BY id`,
    values
  );
  return result.rows;
};

export const getAttendanceSummary = async (
  id: number
): Promise<AttendanceSummary | null> => {
  const result = await pool.query<AttendanceSummary>(
    'SELECT * FROM t_attendance_summaries WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createAttendanceSummary = async (data: {
  employee_id: number;
  summary_date: string;
  working_minutes: number;
  overtime_minutes?: number;
  break_minutes?: number;
  is_late?: boolean;
  is_left_early?: boolean;
  notes?: string;
  is_active?: boolean;
}): Promise<AttendanceSummary> => {
  const {
    employee_id,
    summary_date,
    working_minutes,
    overtime_minutes = 0,
    break_minutes = 0,
    is_late = false,
    is_left_early = false,
    notes = null,
    is_active = true,
  } = data;
  const result = await pool.query<AttendanceSummary>(
    'INSERT INTO t_attendance_summaries (employee_id, summary_date, working_minutes, overtime_minutes, break_minutes, is_late, is_left_early, notes, is_active, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, now(), now()) RETURNING *',
    [
      employee_id,
      summary_date,
      working_minutes,
      overtime_minutes,
      break_minutes,
      is_late,
      is_left_early,
      notes,
      is_active,
    ]
  );
  return result.rows[0];
};

export const updateAttendanceSummary = async (
  id: number,
  data: {
    employee_id?: number;
    summary_date?: string;
    working_minutes?: number;
    overtime_minutes?: number;
    break_minutes?: number;
    is_late?: boolean;
    is_left_early?: boolean;
    notes?: string | null;
    is_active?: boolean;
  }
): Promise<AttendanceSummary | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.employee_id !== undefined) {
    fields.push(`employee_id = $${idx++}`);
    values.push(data.employee_id);
  }
  if (data.summary_date !== undefined) {
    fields.push(`summary_date = $${idx++}`);
    values.push(data.summary_date);
  }
  if (data.working_minutes !== undefined) {
    fields.push(`working_minutes = $${idx++}`);
    values.push(data.working_minutes);
  }
  if (data.overtime_minutes !== undefined) {
    fields.push(`overtime_minutes = $${idx++}`);
    values.push(data.overtime_minutes);
  }
  if (data.break_minutes !== undefined) {
    fields.push(`break_minutes = $${idx++}`);
    values.push(data.break_minutes);
  }
  if (data.is_late !== undefined) {
    fields.push(`is_late = $${idx++}`);
    values.push(data.is_late);
  }
  if (data.is_left_early !== undefined) {
    fields.push(`is_left_early = $${idx++}`);
    values.push(data.is_left_early);
  }
  if (data.notes !== undefined) {
    fields.push(`notes = $${idx++}`);
    values.push(data.notes);
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

  const result = await pool.query<AttendanceSummary>(
    `UPDATE t_attendance_summaries SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteAttendanceSummary = async (
  id: number
): Promise<AttendanceSummary | null> => {
  const result = await pool.query<AttendanceSummary>(
    'UPDATE t_attendance_summaries SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
