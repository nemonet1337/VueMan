import { FastifyInstance } from 'fastify';
import {
  createPositionHandler,
  deletePositionHandler,
  getPositionHandler,
  getPositionsHandler,
  updatePositionHandler,
} from '../controllers/positions.controller';

export default async function positionsRoutes(fastify: FastifyInstance) {
  fastify.get('/positions', getPositionsHandler);
  fastify.get('/positions/:id', getPositionHandler);
  fastify.post('/positions', createPositionHandler);
  fastify.put('/positions/:id', updatePositionHandler);
  fastify.delete('/positions/:id', deletePositionHandler);
}
