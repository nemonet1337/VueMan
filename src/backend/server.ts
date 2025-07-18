import Fastify from 'fastify';
import positionRoutes from './routes/positions.routes';
import jwtPlugin from './utils/jwt';

const app = Fastify();

app.register(jwtPlugin);
app.register(positionRoutes, { prefix: '/positions' });

export default app;

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app
    .listen({ port, host: '0.0.0.0' })
    .catch((err) => {
      app.log.error(err);
      process.exit(1);
    });
}
