import { z } from 'zod';

export const createOfficeSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
});

export const updateOfficeSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().optional(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
});
