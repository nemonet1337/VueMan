import { z } from 'zod';

export const createDepartmentSchema = z.object({
  department_code: z.string().min(1),
  name: z.string().min(1),
  office_id: z.number().int(),
  is_active: z.boolean().optional().default(true),
});

export const updateDepartmentSchema = z.object({
  department_code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  office_id: z.number().int().optional(),
  is_active: z.boolean().optional(),
});
