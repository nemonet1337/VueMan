import { Request, Response } from 'express';
import pool from '../utils/db';

export interface Employee {
  id: number;
  name: string;
  kana: string;
  email: string;
  phone_number: string;
  hire_date: string;
  business_location_id: number;
  position_id: number;
  work_pattern_id: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM m_employees WHERE is_active = true');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM m_employees WHERE id = $1 AND is_active = true', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  const { name, kana, email, phone_number, hire_date, business_location_id, position_id, work_pattern_id } = req.body;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO m_employees (name, kana, email, phone_number, hire_date, business_location_id, position_id, work_pattern_id, is_active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,true) RETURNING *`,
      [name, kana, email, phone_number, hire_date, business_location_id, position_id, work_pattern_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, kana, email, phone_number, hire_date, business_location_id, position_id, work_pattern_id, is_active } = req.body;
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  try {
    const result = await pool.query(
      `UPDATE m_employees SET name=$1, kana=$2, email=$3, phone_number=$4, hire_date=$5,
       business_location_id=$6, position_id=$7, work_pattern_id=$8, is_active=$9, updated_at=NOW()
       WHERE id=$10 RETURNING *`,
      [name, kana, email, phone_number, hire_date, business_location_id, position_id, work_pattern_id, is_active, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE m_employees SET is_active=false, updated_at=NOW() WHERE id=$1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
};
