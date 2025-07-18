import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';
import { JwtPayload } from '../../shared/types';

export const loginHandler = async (
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;
  try {
    const result = await request.server.pg.query<{
      id: number;
      email: string;
      password_hash: string;
      roles: string[];
    }>('SELECT * FROM m_users WHERE email = $1', [email]);

    if (result.rowCount === 0) {
      return reply.code(401).send({ message: 'invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return reply.code(401).send({ message: 'invalid credentials' });
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const token = signJwt(payload);
    return reply.send({ token });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ message: 'internal server error' });
  }
};

export const meHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.send(request.user);
};
