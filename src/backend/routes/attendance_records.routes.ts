import { FastifyInstance } from 'fastify';
import {
  getAttendanceRecordsHandler,
  getAttendanceRecordHandler,
  createAttendanceRecordHandler,
  updateAttendanceRecordHandler,
  deleteAttendanceRecordHandler,
} from '../controllers/attendance_records.controller';

export default async function attendanceRecordRoutes(fastify: FastifyInstance) {
  fastify.get('/attendance-records', { onRequest: [fastify.authenticate] }, getAttendanceRecordsHandler);
  fastify.get<{ Params: { id: string } }>('/attendance-records/:id', { onRequest: [fastify.authenticate] }, getAttendanceRecordHandler);
  fastify.post('/attendance-records', { onRequest: [fastify.authenticate] }, createAttendanceRecordHandler);
  fastify.put<{ Params: { id: string } }>('/attendance-records/:id', { onRequest: [fastify.authenticate] }, updateAttendanceRecordHandler);
  fastify.delete<{ Params: { id: string } }>('/attendance-records/:id', { onRequest: [fastify.authenticate] }, deleteAttendanceRecordHandler);
}
