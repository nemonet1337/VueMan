import { z } from 'zod';

export const createAttendanceSummarySchema = z.object({
  employee_id: z.number().int(),
  summary_date: z.string(),
  working_minutes: z.number().int(),
  overtime_minutes: z.number().int().optional().default(0),
  break_minutes: z.number().int().optional().default(0),
  is_late: z.boolean().optional().default(false),
  is_left_early: z.boolean().optional().default(false),
  notes: z.string().optional(),
  is_active: z.boolean().optional().default(true),
});

export const updateAttendanceSummarySchema = z.object({
  employee_id: z.number().int().optional(),
  summary_date: z.string().optional(),
  working_minutes: z.number().int().optional(),
  overtime_minutes: z.number().int().optional(),
  break_minutes: z.number().int().optional(),
  is_late: z.boolean().optional(),
  is_left_early: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
});
