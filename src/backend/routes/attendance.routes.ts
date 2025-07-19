import { FastifyInstance } from 'fastify';
import {
  clockInHandler,
  clockOutHandler,
  getTodayAttendanceHandler,
} from '../controllers/attendance.controller';

export default async function attendanceRoutes(fastify: FastifyInstance) {
  fastify.post('/attendance/clock-in', { onRequest: [fastify.authenticate] }, clockInHandler);
  fastify.post('/attendance/clock-out', { onRequest: [fastify.authenticate] }, clockOutHandler);
  fastify.get('/attendance/today', { onRequest: [fastify.authenticate] }, getTodayAttendanceHandler);
}
