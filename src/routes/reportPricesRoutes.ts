import { FastifyInstance } from 'fastify';
import { reportPrices } from '../controllers/reportPricesController';
import { getRegionByName } from '../controllers/getRegionController';

const reportPricesRoutes = (server: FastifyInstance) => {
  server.get('/api/get-report-prices', reportPrices);
  server.get('/api/get-region/:regionName', getRegionByName);
  //на будущие доработки
  // server.get('/api/get-report-prices', reportPrices);

  // // Добавление маршрута для получения зон отчетов
  // server.get('/api/get-report-zones', reportPrices);

  // // Добавление маршрута для получения групповых отчетов по ценам
  // server.get('/api/get-group-report-prices', reportPrices);
};

export default reportPricesRoutes;
