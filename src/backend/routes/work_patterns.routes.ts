import { FastifyInstance } from 'fastify';
import {
  getWorkPatternsHandler,
  getWorkPatternHandler,
  createWorkPatternHandler,
  updateWorkPatternHandler,
  deleteWorkPatternHandler,
} from '../controllers/work_patterns.controller';

export default async function workPatternRoutes(fastify: FastifyInstance) {
  fastify.get('/work-patterns', { onRequest: [fastify.authenticate] }, getWorkPatternsHandler);
  fastify.get<{ Params: { id: string } }>('/work-patterns/:id', { onRequest: [fastify.authenticate] }, getWorkPatternHandler);
  fastify.post('/work-patterns', { onRequest: [fastify.authenticate] }, createWorkPatternHandler);
  fastify.put<{ Params: { id: string } }>('/work-patterns/:id', { onRequest: [fastify.authenticate] }, updateWorkPatternHandler);
  fastify.delete<{ Params: { id: string } }>('/work-patterns/:id', { onRequest: [fastify.authenticate] }, deleteWorkPatternHandler);
}
