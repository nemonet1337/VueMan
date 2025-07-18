export interface AttendanceRecord {
  id: string;
  employee_id: string;
  work_date: string;
  clock_in: string | null;
  clock_out: string | null;
  is_manual: boolean;
  remarks: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
