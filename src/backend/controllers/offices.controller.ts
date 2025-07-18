import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createOfficeSchema,
  updateOfficeSchema,
} from '../schemas/offices.schema';
import * as officeService from '../services/offices.service';

export const getOfficesHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const offices = await officeService.getOffices();
    return reply.send({ data: offices });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getOfficeHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const office = await officeService.getOfficeById(id);
    if (!office) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: office });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createOfficeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createOfficeSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const office = await officeService.createOffice(parse.data);
    return reply.code(201).send({ data: office });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateOfficeHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateOfficeSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const office = await officeService.updateOffice(id, parse.data);
    if (!office) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: office });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteOfficeHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const office = await officeService.deleteOffice(id);
    if (!office) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: office });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
