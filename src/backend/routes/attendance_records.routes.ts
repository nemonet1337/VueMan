import { FastifyInstance } from 'fastify';
import {
  getAttendanceRecordsHandler,
  getAttendanceRecordHandler,
  createAttendanceRecordHandler,
  updateAttendanceRecordHandler,
  deleteAttendanceRecordHandler,
} from '../controllers/attendance_records.controller';

export default async function attendanceRecordsRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: { employee_id?: string; start_date?: string; end_date?: string };
  }>('/attendance-records', { onRequest: [fastify.authenticate] }, getAttendanceRecordsHandler);
  fastify.get<{ Params: { id: string } }>('/attendance-records/:id', { onRequest: [fastify.authenticate] }, getAttendanceRecordHandler);
  fastify.post('/attendance-records', { onRequest: [fastify.authenticate] }, createAttendanceRecordHandler);
  fastify.put<{ Params: { id: string } }>('/attendance-records/:id', { onRequest: [fastify.authenticate] }, updateAttendanceRecordHandler);
  fastify.delete<{ Params: { id: string } }>('/attendance-records/:id', { onRequest: [fastify.authenticate] }, deleteAttendanceRecordHandler);
}
