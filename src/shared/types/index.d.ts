import { Pool } from 'pg';

export interface JwtPayload {
  id: number;
  email: string;
  roles: string[];
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
  interface FastifyInstance {
    pg: Pool;
  }
}
