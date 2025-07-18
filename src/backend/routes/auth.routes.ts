import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { loginHandler, meHandler } from '../controllers/auth.controller';
import { verifyJwt } from '../utils/jwt';

export default async function authRoutes(fastify: FastifyInstance) {
  const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.code(401).send({ message: 'unauthorized' });
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      const payload = verifyJwt(token);
      request.user = payload;
    } catch (err) {
      return reply.code(401).send({ message: 'unauthorized' });
    }
  };

  fastify.post('/auth/login', loginHandler);
  fastify.get('/auth/me', { preHandler: authenticate }, meHandler);
}
