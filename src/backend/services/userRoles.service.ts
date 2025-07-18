import pool from '../utils/db';
import { UserRole } from '../../shared/types/userRoles';

export const getAllUserRoles = async (): Promise<UserRole[]> => {
  const result = await pool.query<UserRole>(
    'SELECT user_id, role_id, assigned_at FROM m_user_roles ORDER BY user_id, role_id'
  );
  return result.rows;
};

export const getUserRolesByUserId = async (
  userId: number
): Promise<UserRole[]> => {
  const result = await pool.query<UserRole>(
    'SELECT user_id, role_id, assigned_at FROM m_user_roles WHERE user_id = $1 ORDER BY role_id',
    [userId]
  );
  return result.rows;
};

export const assignRole = async (
  userId: number,
  roleId: number
): Promise<UserRole | null> => {
  const result = await pool.query<UserRole>(
    'INSERT INTO m_user_roles (user_id, role_id, assigned_at) VALUES ($1, $2, now()) ON CONFLICT (user_id, role_id) DO NOTHING RETURNING user_id, role_id, assigned_at',
    [userId, roleId]
  );
  return result.rows[0] || null;
};

export const removeRole = async (
  userId: number,
  roleId: number
): Promise<UserRole | null> => {
  const result = await pool.query<UserRole>(
    'DELETE FROM m_user_roles WHERE user_id = $1 AND role_id = $2 RETURNING user_id, role_id, assigned_at',
    [userId, roleId]
  );
  return result.rows[0] || null;
};
