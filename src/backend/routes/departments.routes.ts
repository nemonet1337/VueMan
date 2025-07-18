import { FastifyInstance } from 'fastify';
import {
  createDepartmentHandler,
  deleteDepartmentHandler,
  getDepartmentHandler,
  getDepartmentsHandler,
  updateDepartmentHandler,
} from '../controllers/departments.controller';

export default async function departmentsRoutes(fastify: FastifyInstance) {
  fastify.get('/departments', { onRequest: [fastify.authenticate] }, getDepartmentsHandler);
  fastify.get<{ Params: { id: string } }>('/departments/:id', { onRequest: [fastify.authenticate] }, getDepartmentHandler);
  fastify.post('/departments', { onRequest: [fastify.authenticate] }, createDepartmentHandler);
  fastify.put<{ Params: { id: string } }>('/departments/:id', { onRequest: [fastify.authenticate] }, updateDepartmentHandler);
  fastify.delete<{ Params: { id: string } }>('/departments/:id', { onRequest: [fastify.authenticate] }, deleteDepartmentHandler);
}
