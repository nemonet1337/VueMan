import { Pool } from 'pg';
import { FastifyRequest, FastifyReply } from 'fastify';

export interface JwtPayload {
  id: number;
  email: string;
  roles: string[];
}

export interface User {
  id: number;
  email: string;
  roles: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Office {
  id: number;
  name: string;
  location: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Department {
  id: number;
  department_code: string;
  name: string;
  office_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}
