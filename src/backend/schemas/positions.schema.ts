import { z } from 'zod';

export const createPositionSchema = z.object({
  title: z.string().min(1),
});

export const updatePositionSchema = z.object({
  title: z.string().min(1).optional(),
});
