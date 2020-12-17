import express from 'express';
import cors from 'cors';

import RouterSingleton from './router/routerSingleton';
import DatabaseHandler from './database/databaseHandler';
import DatabaseHandlerInitializer from './database/databaseHandlerInitializer';

export default class SimpleApp {
  express: express.Application;
  router: RouterSingleton;
  databaseHandler: DatabaseHandler;
  constructor(router: RouterSingleton, databaseHandler: DatabaseHandler) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.databaseHandler = databaseHandler;
    this.routes(databaseHandler.getInit());
  }

  protected middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  protected routes(initDefault?: DatabaseHandlerInitializer): void {
    this.router.createRoutes(initDefault);
    this.express.use(this.router.getRoutes());
  }
}
