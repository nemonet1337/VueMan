import { FastifyInstance } from 'fastify';
import {
  getOfficesHandler,
  getOfficeHandler,
  createOfficeHandler,
  updateOfficeHandler,
  deleteOfficeHandler,
} from '../controllers/offices.controller';

export default async function officeRoutes(fastify: FastifyInstance) {
  fastify.get('/offices', { onRequest: [fastify.authenticate] }, getOfficesHandler);
  fastify.get<{ Params: { id: string } }>('/offices/:id', { onRequest: [fastify.authenticate] }, getOfficeHandler);
  fastify.post('/offices', { onRequest: [fastify.authenticate] }, createOfficeHandler);
  fastify.put<{ Params: { id: string } }>('/offices/:id', { onRequest: [fastify.authenticate] }, updateOfficeHandler);
  fastify.delete<{ Params: { id: string } }>('/offices/:id', { onRequest: [fastify.authenticate] }, deleteOfficeHandler);
}
