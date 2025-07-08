import pool from '../utils/db';

export interface AttendanceInput {
  employee_id: number;
  timestamp: string;
  location_lat?: number | null;
  location_lng?: number | null;
  remarks?: string | null;
}

export async function createRecord(recordType: string, recordedBy: number, input: AttendanceInput) {
  const client = await pool.connect();
  try {
    const { employee_id, timestamp, location_lat, location_lng, remarks } = input;
    const result = await client.query(
      `INSERT INTO t_attendance_records
        (employee_id, record_type, recorded_at, recorded_by, location_lat, location_lng, remarks)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        employee_id,
        recordType,
        new Date(timestamp),
        recordedBy,
        location_lat ?? null,
        location_lng ?? null,
        remarks ?? null,
      ],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getMyRecords(userId: number) {
  const result = await pool.query(
    `SELECT * FROM t_attendance_records WHERE recorded_by = $1 ORDER BY recorded_at DESC`,
    [userId],
  );
  return result.rows;
}

export async function getRecordsByDate(date: string) {
  const start = new Date(date + 'T00:00:00');
  const end = new Date(date + 'T23:59:59');
  const result = await pool.query(
    `SELECT * FROM t_attendance_records WHERE recorded_at BETWEEN $1 AND $2 ORDER BY recorded_at ASC`,
    [start, end],
  );
  return result.rows;
}
