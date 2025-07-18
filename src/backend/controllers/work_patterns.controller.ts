import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createWorkPattern,
  deleteWorkPattern,
  getWorkPattern,
  getWorkPatterns,
  updateWorkPattern,
} from '../services/work_patterns.service';
import {
  createWorkPatternSchema,
  updateWorkPatternSchema,
} from '../schemas/work_patterns.schema';

export const getWorkPatternsHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const patterns = await getWorkPatterns();
    return reply.send({ data: patterns });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getWorkPatternHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const pattern = await getWorkPattern(id);
    if (!pattern) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: pattern });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createWorkPatternHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createWorkPatternSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const pattern = await createWorkPattern(parse.data);
    return reply.code(201).send({ data: pattern });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateWorkPatternHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateWorkPatternSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const pattern = await updateWorkPattern(id, parse.data);
    if (!pattern) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: pattern });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteWorkPatternHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const pattern = await deleteWorkPattern(id);
    if (!pattern) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: pattern });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
