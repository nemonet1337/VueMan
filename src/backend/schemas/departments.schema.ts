import { z } from 'zod';

export const createDepartmentSchema = z.object({
  department_code: z.string().min(1),
  name: z.string().min(1),
  office_id: z.number().int(),
});

export const updateDepartmentSchema = z.object({
  department_code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  office_id: z.number().int().optional(),
});
