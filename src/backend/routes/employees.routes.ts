import { FastifyInstance } from 'fastify';
import {
  getEmployeesHandler,
  getEmployeeHandler,
  createEmployeeHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
} from '../controllers/employees.controller';

export default async function employeeRoutes(fastify: FastifyInstance) {
  fastify.get('/employees', { onRequest: [fastify.authenticate] }, getEmployeesHandler);
  fastify.get<{ Params: { id: string } }>('/employees/:id', { onRequest: [fastify.authenticate] }, getEmployeeHandler);
  fastify.post('/employees', { onRequest: [fastify.authenticate] }, createEmployeeHandler);
  fastify.put<{ Params: { id: string } }>('/employees/:id', { onRequest: [fastify.authenticate] }, updateEmployeeHandler);
  fastify.delete<{ Params: { id: string } }>('/employees/:id', { onRequest: [fastify.authenticate] }, deleteEmployeeHandler);
}
