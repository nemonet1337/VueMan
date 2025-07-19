import { FastifyInstance } from 'fastify';
import {
  getAttendanceSummariesHandler,
  getAttendanceSummaryHandler,
  createAttendanceSummaryHandler,
  updateAttendanceSummaryHandler,
  deleteAttendanceSummaryHandler,
} from '../controllers/attendance_summaries.controller';

export default async function attendanceSummariesRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: { employee_id?: string; start_date?: string; end_date?: string };
  }>('/attendance-summaries', { onRequest: [fastify.authenticate] }, getAttendanceSummariesHandler);
  fastify.get<{ Params: { id: string } }>('/attendance-summaries/:id', { onRequest: [fastify.authenticate] }, getAttendanceSummaryHandler);
  fastify.post('/attendance-summaries', { onRequest: [fastify.authenticate] }, createAttendanceSummaryHandler);
  fastify.put<{ Params: { id: string } }>('/attendance-summaries/:id', { onRequest: [fastify.authenticate] }, updateAttendanceSummaryHandler);
  fastify.delete<{ Params: { id: string } }>('/attendance-summaries/:id', { onRequest: [fastify.authenticate] }, deleteAttendanceSummaryHandler);
}
