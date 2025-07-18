import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createAttendanceRecord,
  deleteAttendanceRecord,
  getAttendanceRecord,
  getAttendanceRecords,
  updateAttendanceRecord,
} from '../services/attendance_records.service';
import {
  createAttendanceRecordSchema,
  updateAttendanceRecordSchema,
} from '../schemas/attendance_records.schema';

export const getAttendanceRecordsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const params = request.query as {
    employee_id?: string;
    start_date?: string;
    end_date?: string;
  };
  try {
    const records = await getAttendanceRecords(params);
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
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const record = await getAttendanceRecord(id);
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
    const record = await createAttendanceRecord(parse.data);
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
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  const parse = updateAttendanceRecordSchema.safeParse(request.body);
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const record = await updateAttendanceRecord(id, parse.data);
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
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ message: 'invalid id' });
  }
  try {
    const record = await deleteAttendanceRecord(id);
    if (!record) {
      return reply.code(404).send({ message: 'not found' });
    }
    return reply.send({ data: record });
  } catch (err) {
    reply.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
