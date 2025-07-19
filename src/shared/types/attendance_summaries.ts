export interface AttendanceSummary {
  id: number;
  employee_id: number;
  summary_date: string;
  working_minutes: number;
  overtime_minutes: number;
  break_minutes: number;
  is_late: boolean;
  is_left_early: boolean;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
