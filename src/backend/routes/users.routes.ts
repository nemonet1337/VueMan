import { FastifyInstance } from 'fastify';
import {
  getUsersHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/users.controller';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', { onRequest: [fastify.authenticate] }, getUsersHandler);
  fastify.get<{ Params: { id: string } }>('/users/:id', { onRequest: [fastify.authenticate] }, getUserHandler);
  fastify.post('/users', { onRequest: [fastify.authenticate] }, createUserHandler);
  fastify.put<{ Params: { id: string } }>('/users/:id', { onRequest: [fastify.authenticate] }, updateUserHandler);
  fastify.delete<{ Params: { id: string } }>('/users/:id', { onRequest: [fastify.authenticate] }, deleteUserHandler);
}
