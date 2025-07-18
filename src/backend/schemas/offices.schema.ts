import { z } from 'zod';

export const createOfficeSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
});

export const updateOfficeSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
});
