import { z } from 'zod';

export const createRoleSchema = z.object({
  role_name: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().optional().default(true),
});

export const updateRoleSchema = z.object({
  role_name: z.string().min(1).optional(),
  description: z.string().optional(),
  is_active: z.boolean().optional(),
});
