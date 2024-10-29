import { FastifyReply, FastifyRequest } from 'fastify';
import { reportPriceParser } from '../services/reportPricesService';

export const reportPrices = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { regionsData } = await reportPriceParser();
    reply.send({ success: true, message: 'Данные успешно сохранены в базу', data: regionsData });
  } catch (error) {
    reply.status(500).send({ success: false, error: 'Ошибка сервера' });
  }
};
