import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../schemas/employees.schema';
import * as employeeService from '../services/employees.service';

export const getEmployeesHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const employees = await employeeService.getEmployees();
    return reply.send({ data: employees });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getEmployeeHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: employee });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createEmployeeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createEmployeeSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const employee = await employeeService.createEmployee(parse.data);
    return reply.code(201).send({ data: employee });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateEmployeeHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateEmployeeSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const employee = await employeeService.updateEmployee(id, parse.data);
    if (!employee) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: employee });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteEmployeeHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const employee = await employeeService.deleteEmployee(id);
    if (!employee) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: employee });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
