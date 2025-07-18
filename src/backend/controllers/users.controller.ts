import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema, updateUserSchema } from '../schemas/users.schema';
import * as userService from '../services/users.service';

export const getUsersHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await userService.getUsers();
    return reply.send({ data: users });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getUserHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: user });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createUserSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  const { email, password, roles } = parse.data;
  try {
    const user = await userService.createUser(email, password, roles);
    return reply.code(201).send({ data: user });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateUserHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateUserSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const user = await userService.updateUser(id, parse.data);
    if (!user) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: user });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteUserHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const user = await userService.deleteUser(id);
    if (!user) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: user });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
