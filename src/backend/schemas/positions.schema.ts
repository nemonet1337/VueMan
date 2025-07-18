import { z } from 'zod';

export const createPositionSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().optional().default(true),
});

export const updatePositionSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  is_active: z.boolean().optional(),
});
