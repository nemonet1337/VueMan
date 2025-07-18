import { z } from 'zod';

export const userRoleSchema = z.object({
  user_id: z.number().int(),
  role_id: z.number().int(),
});
