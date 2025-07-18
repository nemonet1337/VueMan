import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employee_code: z.string().min(1),
  full_name: z.string().min(1),
  email: z.string().email(),
  hire_date: z.string().min(1),
  is_active: z.boolean().optional(),
});

export const updateEmployeeSchema = z.object({
  employee_code: z.string().min(1).optional(),
  full_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  hire_date: z.string().min(1).optional(),
  is_active: z.boolean().optional(),
});
