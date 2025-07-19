import { Pool } from 'pg';
import { FastifyRequest, FastifyReply } from 'fastify';

export interface JwtPayload {
  id: string;
  email: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Office {
  id: string;
  name: string;
  address: string | null;
  open_time: string | null;
  close_time: string | null;
}

export interface Employee {
  id: string;
  user_id: string | null;
  name: string;
  office_id: string;
  position_id: string;
  work_pattern_id: string;
  status: string;
  hired_at: string | null;
}

export interface Position {
  id: string;
  title: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface WorkPattern {
  id: number;
  pattern_code: string;
  name: string;
  start_time: string;
  end_time: string;
  break_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  user_id: string;
  role_id: string;
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

export interface Department {
  id: string;
  department_code: string;
  name: string;
  office_id: string;
}

export interface AttendanceRecord {
  id: number;
  employee_id: number;
  work_date: string;
  clock_in: string | null;
  clock_out: string | null;
  is_manual: boolean;
  remarks: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AttendanceSummary {
  id: number;
  employee_id: number;
  summary_date: string;
  working_minutes: number;
  overtime_minutes: number;
  break_minutes: number;
  is_late: boolean;
  is_left_early: boolean;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
