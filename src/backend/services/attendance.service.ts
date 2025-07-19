import pool from '../utils/db';
import { AttendanceRecord } from '../../shared/types';

const getTodayJst = (): string => {
  const now = new Date();
  const jst = new Date(now.getTime() + (9 * 60 - now.getTimezoneOffset()) * 60000);
  return jst.toISOString().split('T')[0];
};

const findRecordForToday = async (employeeId: number) => {
  const today = getTodayJst();
  const result = await pool.query<AttendanceRecord>(
    'SELECT * FROM t_attendance_records WHERE employee_id = $1 AND work_date = $2 AND is_active = true',
    [employeeId, today]
  );
  return result.rows[0] || null;
};

export const clockIn = async (
  employeeId: number
): Promise<AttendanceRecord> => {
  const today = getTodayJst();
  const existing = await findRecordForToday(employeeId);
  if (existing && existing.clock_in) {
    throw new Error('already clocked in');
  }
  if (existing) {
    const result = await pool.query<AttendanceRecord>(
      'UPDATE t_attendance_records SET clock_in = now(), updated_at = now() WHERE id = $1 RETURNING *',
      [existing.id]
    );
    return result.rows[0];
  }
  const result = await pool.query<AttendanceRecord>(
    'INSERT INTO t_attendance_records (employee_id, work_date, clock_in, is_active, created_at, updated_at) VALUES ($1, $2, now(), true, now(), now()) RETURNING *',
    [employeeId, today]
  );
  return result.rows[0];
};

export const clockOut = async (
  employeeId: number
): Promise<AttendanceRecord> => {
  const record = await findRecordForToday(employeeId);
  if (!record || !record.clock_in) {
    throw new Error('not clocked in');
  }
  if (record.clock_out) {
    throw new Error('already clocked out');
  }
  const result = await pool.query<AttendanceRecord>(
    'UPDATE t_attendance_records SET clock_out = now(), updated_at = now() WHERE id = $1 RETURNING *',
    [record.id]
  );
  return result.rows[0];
};

export const getTodayAttendance = async (
  employeeId: number
): Promise<AttendanceRecord | null> => {
  return findRecordForToday(employeeId);
};

export const findEmployeeIdByUserId = async (
  userId: string
): Promise<number | null> => {
  const result = await pool.query<{ id: number }>(
    'SELECT id FROM m_employees WHERE user_id = $1',
    [userId]
  );
  return result.rows[0]?.id ?? null;
};
