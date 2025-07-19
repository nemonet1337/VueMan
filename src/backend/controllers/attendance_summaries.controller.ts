import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createAttendanceSummarySchema,
  updateAttendanceSummarySchema,
} from '../schemas/attendance_summaries.schema';
import * as summaryService from '../services/attendance_summaries.service';

export const getAttendanceSummariesHandler = async (
  request: FastifyRequest<{ Querystring: { employee_id?: string; start_date?: string; end_date?: string } }>,
  reply: FastifyReply
) => {
  const { employee_id, start_date, end_date } = request.query;
  try {
    const summaries = await summaryService.getAttendanceSummaries({
      employee_id: employee_id ? Number(employee_id) : undefined,
      start_date,
      end_date,
    });
    return reply.send({ data: summaries });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getAttendanceSummaryHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const summary = await summaryService.getAttendanceSummary(id);
    if (!summary) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: summary });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createAttendanceSummaryHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createAttendanceSummarySchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const summary = await summaryService.createAttendanceSummary(parse.data);
    return reply.code(201).send({ data: summary });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateAttendanceSummaryHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateAttendanceSummarySchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const summary = await summaryService.updateAttendanceSummary(id, parse.data);
    if (!summary) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: summary });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteAttendanceSummaryHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const summary = await summaryService.deleteAttendanceSummary(id);
    if (!summary) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: summary });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
