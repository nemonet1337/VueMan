import pool from '../utils/db';
import { AttendanceRecord } from '../../shared/types';

interface GetRecordsParams {
  employee_id?: string;
  start_date?: string;
  end_date?: string;
}

export const getAttendanceRecords = async (
  params: GetRecordsParams
): Promise<AttendanceRecord[]> => {
  const conditions: string[] = ['is_active = true'];
  const values: any[] = [];
  let idx = 1;

  if (params.employee_id) {
    conditions.push(`employee_id = $${idx++}`);
    values.push(params.employee_id);
  }
  if (params.start_date) {
    conditions.push(`work_date >= $${idx++}`);
    values.push(params.start_date);
  }
  if (params.end_date) {
    conditions.push(`work_date <= $${idx++}`);
    values.push(params.end_date);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query<AttendanceRecord>(
    `SELECT * FROM t_attendance_records ${where} ORDER BY work_date DESC, id`,
    values
  );
  return result.rows;
};

export const getAttendanceRecord = async (
  id: string
): Promise<AttendanceRecord | null> => {
  const result = await pool.query<AttendanceRecord>(
    'SELECT * FROM t_attendance_records WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
};

export const createAttendanceRecord = async (
  data: {
    employee_id: string;
    work_date: string;
    clock_in?: string | null;
    clock_out?: string | null;
    is_manual?: boolean;
    remarks?: string | null;
  }
): Promise<AttendanceRecord> => {
  const {
    employee_id,
    work_date,
    clock_in = null,
    clock_out = null,
    is_manual = false,
    remarks = null,
  } = data;
  const result = await pool.query<AttendanceRecord>(
    'INSERT INTO t_attendance_records (employee_id, work_date, clock_in, clock_out, is_manual, remarks, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, true, now(), now()) RETURNING *',
    [employee_id, work_date, clock_in, clock_out, is_manual, remarks]
  );
  return result.rows[0];
};

export const updateAttendanceRecord = async (
  id: string,
  data: {
    employee_id?: string;
    work_date?: string;
    clock_in?: string | null;
    clock_out?: string | null;
    is_manual?: boolean;
    remarks?: string | null;
    is_active?: boolean;
  }
): Promise<AttendanceRecord | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.employee_id !== undefined) {
    fields.push(`employee_id = $${idx++}`);
    values.push(data.employee_id);
  }
  if (data.work_date !== undefined) {
    fields.push(`work_date = $${idx++}`);
    values.push(data.work_date);
  }
  if (data.clock_in !== undefined) {
    fields.push(`clock_in = $${idx++}`);
    values.push(data.clock_in);
  }
  if (data.clock_out !== undefined) {
    fields.push(`clock_out = $${idx++}`);
    values.push(data.clock_out);
  }
  if (data.is_manual !== undefined) {
    fields.push(`is_manual = $${idx++}`);
    values.push(data.is_manual);
  }
  if (data.remarks !== undefined) {
    fields.push(`remarks = $${idx++}`);
    values.push(data.remarks);
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

  const result = await pool.query<AttendanceRecord>(
    `UPDATE t_attendance_records SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteAttendanceRecord = async (
  id: string
): Promise<AttendanceRecord | null> => {
  const result = await pool.query<AttendanceRecord>(
    'UPDATE t_attendance_records SET is_active = false, updated_at = now() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
