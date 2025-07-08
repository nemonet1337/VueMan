import { Request, Response } from 'express';
import pool from '../utils/db';

export async function getEmployees(req: Request, res: Response) {
  try {
    const query = `
      SELECT e.*, bl.name AS business_location_name, p.name AS position_name, wp.name AS work_pattern_name
      FROM m_employees e
      JOIN m_business_locations bl ON e.business_location_id = bl.id
      JOIN m_positions p ON e.position_id = p.id
      JOIN m_work_patterns wp ON e.work_pattern_id = wp.id
      WHERE e.is_active = true
      ORDER BY e.id`;
    const { rows } = await pool.query(query);
    res.json({ data: rows, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getEmployeeById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const query = `
      SELECT e.*, bl.name AS business_location_name, p.name AS position_name, wp.name AS work_pattern_name
      FROM m_employees e
      JOIN m_business_locations bl ON e.business_location_id = bl.id
      JOIN m_positions p ON e.position_id = p.id
      JOIN m_work_patterns wp ON e.work_pattern_id = wp.id
      WHERE e.id = $1 AND e.is_active = true`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not Found' });
    res.json({ data: rows[0], message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function createEmployee(req: Request, res: Response) {
  const {
    name,
    kana,
    email,
    phone_number,
    hire_date,
    business_location_id,
    position_id,
    work_pattern_id,
  } = req.body;
  try {
    const query = `
      INSERT INTO m_employees
        (name, kana, email, phone_number, hire_date, business_location_id, position_id, work_pattern_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`;
    const values = [
      name,
      kana,
      email,
      phone_number,
      hire_date,
      business_location_id,
      position_id,
      work_pattern_id,
    ];
    const { rows } = await pool.query(query, values);
    res.status(201).json({ data: rows[0], message: 'created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function updateEmployee(req: Request, res: Response) {
  const id = req.params.id;
  const {
    name,
    kana,
    email,
    phone_number,
    hire_date,
    business_location_id,
    position_id,
    work_pattern_id,
    is_active,
  } = req.body;
  try {
    const query = `
      UPDATE m_employees SET
        name=$1, kana=$2, email=$3, phone_number=$4, hire_date=$5,
        business_location_id=$6, position_id=$7, work_pattern_id=$8, is_active=$9,
        updated_at=now()
      WHERE id=$10
      RETURNING *`;
    const values = [
      name,
      kana,
      email,
      phone_number,
      hire_date,
      business_location_id,
      position_id,
      work_pattern_id,
      is_active,
      id,
    ];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return res.status(404).json({ message: 'Not Found' });
    res.json({ data: rows[0], message: 'updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const query = `
      UPDATE m_employees SET is_active=false, updated_at=now()
      WHERE id=$1
      RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not Found' });
    res.json({ data: rows[0], message: 'deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
