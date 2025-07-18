import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(1),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1).optional(),
});
