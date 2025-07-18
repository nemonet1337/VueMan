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
  fastify.post<{ Body: { user_id: string; role_id: string } }>('/user-roles', { onRequest: [fastify.authenticate] }, assignRoleHandler);
  fastify.delete<{ Body: { user_id: string; role_id: string } }>('/user-roles', { onRequest: [fastify.authenticate] }, removeRoleHandler);
}
