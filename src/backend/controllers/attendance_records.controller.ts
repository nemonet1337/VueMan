import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createAttendanceRecordSchema,
  updateAttendanceRecordSchema,
} from '../schemas/attendance_records.schema';
import * as attendanceService from '../services/attendance_records.service';

export const getAttendanceRecordsHandler = async (
  request: FastifyRequest<{ Querystring: { employee_id?: string; start_date?: string; end_date?: string } }>,
  reply: FastifyReply
) => {
  const { employee_id, start_date, end_date } = request.query;
  try {
    const records = await attendanceService.getAttendanceRecords({
      employee_id: employee_id ? Number(employee_id) : undefined,
      start_date,
      end_date,
    });
    return reply.send({ data: records });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const getAttendanceRecordHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const record = await attendanceService.getAttendanceRecord(id);
    if (!record) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: record });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const createAttendanceRecordHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = createAttendanceRecordSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const record = await attendanceService.createAttendanceRecord(parse.data);
    return reply.code(201).send({ data: record });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const updateAttendanceRecordHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateAttendanceRecordSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const record = await attendanceService.updateAttendanceRecord(id, parse.data);
    if (!record) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: record });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const deleteAttendanceRecordHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  if (Number.isNaN(id)) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const record = await attendanceService.deleteAttendanceRecord(id);
    if (!record) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: record });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
