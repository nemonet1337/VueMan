import { FastifyPluginAsync } from 'fastify';
import {
  createPositionController,
  deletePositionController,
  getPositionController,
  getPositionsController,
  updatePositionController,
} from '../controllers/positions.controller';

const positionRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get('/', getPositionsController);
  fastify.get('/:id', getPositionController);
  fastify.post('/', createPositionController);
  fastify.put('/:id', updatePositionController);
  fastify.delete('/:id', deletePositionController);
};

export default positionRoutes;
