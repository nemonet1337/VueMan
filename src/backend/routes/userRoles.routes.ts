import { FastifyInstance } from 'fastify';
import {
  getAllUserRolesHandler,
  getUserRolesHandler,
  assignRoleHandler,
  removeRoleHandler,
} from '../controllers/userRoles.controller';

export default async function userRolesRoutes(fastify: FastifyInstance) {
  fastify.get('/user-roles', { onRequest: [fastify.authenticate] }, getAllUserRolesHandler);
  fastify.get<{ Params: { userId: string } }>('/user-roles/:userId', { onRequest: [fastify.authenticate] }, getUserRolesHandler);
  fastify.post('/user-roles', { onRequest: [fastify.authenticate] }, assignRoleHandler);
  fastify.delete('/user-roles', { onRequest: [fastify.authenticate] }, removeRoleHandler);
}
