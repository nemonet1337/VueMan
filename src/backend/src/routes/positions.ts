import { Router } from 'express';
import pool from '../utils/db';
import { authenticate } from '../middlewares/authenticate';

const router = Router();
router.use(authenticate);

type Position = {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Get all positions
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query<Position>('SELECT * FROM m_positions WHERE is_active = true ORDER BY id');
    res.json({ data: result.rows, message: 'success' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
    return;
  }
});

// Get position by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query<Position>('SELECT * FROM m_positions WHERE id = $1 AND is_active = true', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.json({ data: result.rows[0], message: 'success' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
    return;
  }
});

// Create new position
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name || name.trim() === '') {
    res.status(400).json({ message: 'name is required' });
    return;
  }
  try {
    const result = await pool.query<Position>(
      'INSERT INTO m_positions (name, description) VALUES ($1, $2) RETURNING *',
      [name, description || null]
    );
    res.status(201).json({ data: result.rows[0], message: 'success' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
    return;
  }
});

// Update position
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, is_active } = req.body;
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (name !== undefined) {
      if (name.trim() === '') {
        res.status(400).json({ message: 'name is required' });
        return;
      }
      fields.push(`name = $${idx++}`);
      values.push(name);
    }
    if (description !== undefined) {
      fields.push(`description = $${idx++}`);
      values.push(description);
    }
    if (is_active !== undefined) {
      fields.push(`is_active = $${idx++}`);
      values.push(is_active);
    }
    if (fields.length === 0) {
      res.status(400).json({ message: 'no fields to update' });
      return;
    }
    values.push(id);
    const result = await pool.query<Position>(
      `UPDATE m_positions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.json({ data: result.rows[0], message: 'success' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
    return;
  }
});

// Logical delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query<Position>(
      'UPDATE m_positions SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.json({ data: result.rows[0], message: 'success' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
    return;
  }
});

export default router;
