import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from '../services/departments.service';
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from '../schemas/departments.schema';

export const getDepartmentsHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const departments = await getDepartments();
    return reply.send({ data: departments });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getDepartmentHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const department = await getDepartment(id);
    if (!department) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: department });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createDepartmentHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createDepartmentSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const department = await createDepartment(parse.data);
    return reply.code(201).send({ data: department });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateDepartmentHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateDepartmentSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const department = await updateDepartment(id, parse.data);
    if (!department) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: department });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteDepartmentHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const department = await deleteDepartment(id);
    if (!department) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: department });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
