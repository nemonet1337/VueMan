import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createPosition,
  deletePosition,
  getPositionById,
  getPositions,
  updatePosition,
} from '../services/positions.service';
import {
  PositionInput,
  PositionParams,
  positionSchema,
  positionParamsSchema,
} from '../schemas/positions.schema';

export async function getPositionsController(_req: FastifyRequest, reply: FastifyReply) {
  const data = await getPositions();
  reply.send({ data, message: 'success' });
}

export async function getPositionController(
  request: FastifyRequest<{ Params: PositionParams }>,
  reply: FastifyReply
) {
  const params = positionParamsSchema.parse(request.params);
  const position = await getPositionById(params.id);
  if (!position) {
    reply.code(404).send({ message: 'not found' });
    return;
  }
  reply.send({ data: position, message: 'success' });
}

export async function createPositionController(
  request: FastifyRequest<{ Body: PositionInput }>,
  reply: FastifyReply
) {
  const body = positionSchema.parse(request.body);
  const position = await createPosition(body);
  reply.code(201).send({ data: position, message: 'success' });
}

export async function updatePositionController(
  request: FastifyRequest<{ Params: PositionParams; Body: PositionInput }>,
  reply: FastifyReply
) {
  const params = positionParamsSchema.parse(request.params);
  const body = positionSchema.partial().parse(request.body);
  const position = await updatePosition(params.id, body);
  if (!position) {
    reply.code(404).send({ message: 'not found' });
    return;
  }
  reply.send({ data: position, message: 'success' });
}

export async function deletePositionController(
  request: FastifyRequest<{ Params: PositionParams }>,
  reply: FastifyReply
) {
  const params = positionParamsSchema.parse(request.params);
  const position = await deletePosition(params.id);
  if (!position) {
    reply.code(404).send({ message: 'not found' });
    return;
  }
  reply.send({ data: position, message: 'success' });
}
