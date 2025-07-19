import { FastifyReply, FastifyRequest } from 'fastify';
import {
  clockInSchema,
  clockOutSchema,
} from '../schemas/attendance.schema';
import * as attendanceService from '../services/attendance.service';

export const clockInHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = clockInSchema.safeParse(request.body ?? {});
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const employeeId = await attendanceService.findEmployeeIdByUserId(
      request.user.id
    );
    if (!employeeId) {
      return reply.code(404).send({ message: 'employee not found' });
    }
    const record = await attendanceService.clockIn(employeeId);
    return reply.code(201).send({ data: record });
  } catch (err: any) {
    request.log.error(err);
    return reply.code(400).send({ message: err.message });
  }
};

export const clockOutHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parse = clockOutSchema.safeParse(request.body ?? {});
  if (!parse.success) {
    return reply.code(400).send({ message: parse.error.message });
  }
  try {
    const employeeId = await attendanceService.findEmployeeIdByUserId(
      request.user.id
    );
    if (!employeeId) {
      return reply.code(404).send({ message: 'employee not found' });
    }
    const record = await attendanceService.clockOut(employeeId);
    return reply.send({ data: record });
  } catch (err: any) {
    request.log.error(err);
    return reply.code(400).send({ message: err.message });
  }
};

export const getTodayAttendanceHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const employeeId = await attendanceService.findEmployeeIdByUserId(
      request.user.id
    );
    if (!employeeId) {
      return reply.code(404).send({ message: 'employee not found' });
    }
    const record = await attendanceService.getTodayAttendance(employeeId);
    return reply.send({ data: record });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};
