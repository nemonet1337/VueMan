import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../utils/db';

const saltRounds = 10;

export async function getUsers(req: Request, res: Response) {
  try {
    const result = await pool.query(
      'SELECT id, email, is_active, created_at, updated_at FROM m_users WHERE is_active = true'
    );
    res.json({ data: result.rows, message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, email, is_active, created_at, updated_at FROM m_users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: result.rows[0], message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
}

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'INSERT INTO m_users (email, password_hash) VALUES ($1, $2) RETURNING id, email, is_active, created_at, updated_at',
      [email, hash]
    );
    res.status(201).json({ data: result.rows[0], message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (email !== undefined) {
      fields.push(`email = $${idx}`);
      values.push(email);
      idx++;
    }

    if (password !== undefined) {
      const hash = await bcrypt.hash(password, saltRounds);
      fields.push(`password_hash = $${idx}`);
      values.push(hash);
      idx++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(id);
    const query = `UPDATE m_users SET ${fields.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING id, email, is_active, created_at, updated_at`;
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: result.rows[0], message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE m_users SET is_active = false, updated_at = now() WHERE id = $1 RETURNING id, email, is_active, created_at, updated_at',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: result.rows[0], message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
}
