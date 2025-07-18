import { z } from 'zod';

export const createAttendanceRecordSchema = z.object({
  employee_id: z.number().int(),
  work_date: z.string(),
  clock_in: z.string().optional(),
  clock_out: z.string().optional(),
  is_manual: z.boolean().optional().default(false),
  remarks: z.string().optional(),
});

export const updateAttendanceRecordSchema = z.object({
  employee_id: z.number().int().optional(),
  work_date: z.string().optional(),
  clock_in: z.string().optional().nullable(),
  clock_out: z.string().optional().nullable(),
  is_manual: z.boolean().optional(),
  remarks: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
});
