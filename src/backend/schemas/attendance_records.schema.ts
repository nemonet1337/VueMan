import { z } from 'zod';

export const createAttendanceRecordSchema = z.object({
  employee_id: z.string().uuid(),
  work_date: z.string(),
  clock_in: z.string().optional(),
  clock_out: z.string().optional(),
  is_manual: z.boolean().optional().default(false),
  remarks: z.string().optional(),
});

export const updateAttendanceRecordSchema = z.object({
  employee_id: z.string().uuid().optional(),
  work_date: z.string().optional(),
  clock_in: z.string().nullable().optional(),
  clock_out: z.string().nullable().optional(),
  is_manual: z.boolean().optional(),
  remarks: z.string().optional(),
  is_active: z.boolean().optional(),
});
