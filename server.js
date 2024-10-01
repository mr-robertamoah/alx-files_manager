import express from 'express';
import startServer from './libs/boot';
import withRoutes from './routes';
import withMiddlewares from './libs/middlewares';

const server = express();

withMiddlewares(server);
withRoutes(server);
startServer(server);

export default server;
