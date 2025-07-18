import { z } from 'zod';

export const positionSchema = z.object({
  title: z.string().min(1),
  is_active: z.boolean().optional(),
});

export const positionParamsSchema = z.object({
  id: z.string().transform(Number),
});

export type PositionInput = z.infer<typeof positionSchema>;
export type PositionParams = z.infer<typeof positionParamsSchema>;
