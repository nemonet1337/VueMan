import { z } from 'zod';

export const createEmployeeSchema = z.object({
  user_id: z.string().uuid().optional(),
  name: z.string().min(1),
  office_id: z.string().uuid(),
  position_id: z.string().uuid(),
  work_pattern_id: z.string().uuid(),
  status: z.string().optional(),
  hired_at: z.string().optional(),
});

export const updateEmployeeSchema = z.object({
  user_id: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  office_id: z.string().uuid().optional(),
  position_id: z.string().uuid().optional(),
  work_pattern_id: z.string().uuid().optional(),
  status: z.string().optional(),
  hired_at: z.string().optional(),
});
