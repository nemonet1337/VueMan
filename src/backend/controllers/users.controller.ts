import { Request, Response } from 'express';
import {
  createUserSchema,
  updateUserSchema,
} from '../schemas/users.schema';
import * as userService from '../services/users.service';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json({ data: users, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const parse = createUserSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ message: parse.error.message });
    return;
  }

  const { email, password, roles } = parse.data;
  try {
    const user = await userService.createUser(email, password, roles);
    res.status(201).json({ data: user, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'invalid id' });
    return;
  }

  const parse = updateUserSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ message: parse.error.message });
    return;
  }

  try {
    const user = await userService.updateUser(id, parse.data);
    if (!user) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.json({ data: user, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'invalid id' });
    return;
  }

  try {
    const user = await userService.deleteUser(id);
    if (!user) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.json({ data: user, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
