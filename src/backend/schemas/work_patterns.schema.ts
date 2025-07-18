import { z } from 'zod';

export const createWorkPatternSchema = z.object({
  pattern_code: z.string().min(1),
  name: z.string().min(1),
  start_time: z.string().min(1),
  end_time: z.string().min(1),
  break_minutes: z.number().int().nonnegative(),
  is_active: z.boolean().optional().default(true),
});

export const updateWorkPatternSchema = z.object({
  pattern_code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  start_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional(),
  break_minutes: z.number().int().nonnegative().optional(),
  is_active: z.boolean().optional(),
});
