import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  roles: z.array(z.string()).min(1),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  roles: z.array(z.string()).min(1).optional(),
});
