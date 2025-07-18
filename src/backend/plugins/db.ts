import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  fastify.decorate('pg', pool);

  fastify.addHook('onClose', async () => {
    await pool.end();
  });
};

export default fp(dbPlugin);

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool;
  }
}
