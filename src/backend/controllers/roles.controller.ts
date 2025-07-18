import { FastifyReply, FastifyRequest } from 'fastify';
import { createRoleSchema, updateRoleSchema } from '../schemas/roles.schema';
import * as roleService from '../services/roles.service';

export const getRolesHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const roles = await roleService.getRoles();
    return reply.send({ data: roles });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getRoleHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const role = await roleService.getRoleById(id);
    if (!role) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: role });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createRoleHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createRoleSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const role = await roleService.createRole(parse.data);
    return reply.code(201).send({ data: role });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateRoleHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateRoleSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const role = await roleService.updateRole(id, parse.data);
    if (!role) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: role });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteRoleHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const role = await roleService.deleteRole(id);
    if (!role) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: role });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
