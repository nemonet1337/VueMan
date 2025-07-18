import Fastify from 'fastify';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import officeRoutes from './routes/offices.routes';
import dbPlugin from './plugins/db';
import jwtPlugin from './utils/jwt';

dotenv.config();

const server = Fastify();

server.decorateRequest('user', null);

server.register(dbPlugin);
server.register(jwtPlugin);
server.register(authRoutes);
server.register(officeRoutes);

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
