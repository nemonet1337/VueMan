import { FastifyReply, FastifyRequest } from 'fastify';
import { userRoleSchema } from '../schemas/userRoles.schema';
import * as userRoleService from '../services/userRoles.service';

export const getAllUserRolesHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const roles = await userRoleService.getAllUserRoles();
    return reply.send({ data: roles });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getUserRolesHandler = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  const userId = request.params.userId;
  if (!userId) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const roles = await userRoleService.getUserRolesByUserId(userId);
    return reply.send({ data: roles });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const assignRoleHandler = async (
  request: FastifyRequest<{ Body: { user_id: string; role_id: string } }>,
  reply: FastifyReply
) => {
  const parse = userRoleSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  const { user_id, role_id } = parse.data;
  try {
    const role = await userRoleService.assignRole(user_id, role_id);
    if (!role) {
      return reply.code(409).send({ message: 'already exists' });
    }
    return reply.code(201).send({ data: role });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const removeRoleHandler = async (
  request: FastifyRequest<{ Body: { user_id: string; role_id: string } }>,
  reply: FastifyReply
) => {
  const parse = userRoleSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  const { user_id, role_id } = parse.data;
  try {
    const role = await userRoleService.removeRole(user_id, role_id);
    if (!role) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: role });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
