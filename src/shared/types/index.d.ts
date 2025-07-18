import { Pool } from 'pg';

export interface JwtPayload {
  id: number;
  email: string;
  roles: string[];
}

export interface User {
  id: number;
  email: string;
  roles: string[];
}

export interface Position {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
  interface FastifyInstance {
    pg: Pool;
  }
}
