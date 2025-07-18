import fp from 'fastify-plugin';
import { FastifyPluginCallback, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';

const jwtPlugin: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'secret',
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ message: 'unauthorized' });
      }
    }
  );

  done();
};

export default fp(jwtPlugin);
