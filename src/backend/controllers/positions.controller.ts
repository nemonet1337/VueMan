import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createPosition,
  deletePosition,
  getPosition,
  getPositions,
  updatePosition,
} from '../services/positions.service';
import { createPositionSchema, updatePositionSchema } from '../schemas/positions.schema';

export const getPositionsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const positions = await getPositions();
    return reply.send({ data: positions, message: 'success' });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getPositionHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const position = await getPosition(id);
    if (!position) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: position, message: 'success' });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createPositionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createPositionSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const position = await createPosition(parse.data);
    return reply.code(201).send({ data: position, message: 'success' });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updatePositionHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updatePositionSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const position = await updatePosition(id, parse.data);
    if (!position) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: position, message: 'success' });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deletePositionHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const position = await deletePosition(id);
    if (!position) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: position, message: 'success' });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
