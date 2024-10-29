import { FastifyReply, FastifyRequest } from 'fastify';
import Region from '../models/Region';

export const getRegionByName = async (request: FastifyRequest, reply: FastifyReply) => {
  const { regionName } = request.params as { regionName: string };

  try {
    const regionData = await Region.findOne({ regions: regionName });

    if (regionData) {
      reply.status(200).send({ success: true, data: regionData });
    } else {
      reply.status(404).send({ success: false, message: 'Регион не найден' });
    }
  } catch (error) {
    reply.status(500).send({ success: false, error: 'Ошибка при получении данных' });
  }
};
