import fastify from "fastify";
import cors from '@fastify/cors';
import reportPricesRoutes from './routes/reportPricesRoutes';
// import logger from "./services/logger.js";
import connectToMongoDB from './config/databaseConfig.js';

const server = fastify({logger: true});
// const server = fastify({
//   logger: {
//     stream: {
//       write: (message) => {
//         logger.info(message.trim());
//       }
//     }
//   }
// });

server.register(cors, {
    origin: '*'
});

// routes
reportPricesRoutes(server)
//



const start = async () => {
    try {
      await connectToMongoDB();

      await server.listen({ port: 3000 });
      console.log('Сервер запущен на http://localhost:3000');
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };
  start();