import { FastifyInstance } from 'fastify';
import {
  getRolesHandler,
  getRoleHandler,
  createRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
} from '../controllers/roles.controller';

export default async function roleRoutes(fastify: FastifyInstance) {
  fastify.get('/roles', { onRequest: [fastify.authenticate] }, getRolesHandler);
  fastify.get<{ Params: { id: string } }>('/roles/:id', { onRequest: [fastify.authenticate] }, getRoleHandler);
  fastify.post('/roles', { onRequest: [fastify.authenticate] }, createRoleHandler);
  fastify.put<{ Params: { id: string } }>('/roles/:id', { onRequest: [fastify.authenticate] }, updateRoleHandler);
  fastify.delete<{ Params: { id: string } }>('/roles/:id', { onRequest: [fastify.authenticate] }, deleteRoleHandler);
}
