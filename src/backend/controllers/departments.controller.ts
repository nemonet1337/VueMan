import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from '../schemas/departments.schema';
import * as departmentService from '../services/departments.service';

export const getDepartmentsHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const departments = await departmentService.getDepartments();
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
    const department = await departmentService.getDepartmentById(id);
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
  request: FastifyRequest<{ Body: { department_code: string; name: string; office_id: number } }>,
  reply: FastifyReply
) => {
  const parse = createDepartmentSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const department = await departmentService.createDepartment(parse.data);
    return reply.code(201).send({ data: department });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateDepartmentHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { department_code?: string; name?: string; office_id?: number } }>,
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
    const department = await departmentService.updateDepartment(id, parse.data);
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
    const department = await departmentService.deleteDepartment(id);
    if (!department) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: department });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
