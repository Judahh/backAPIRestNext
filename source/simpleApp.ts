import RouterSingleton from './router/routerSingleton';
import DatabaseHandler from './database/databaseHandler';
import DatabaseHandlerInitializer from './database/databaseHandlerInitializer';

export default class SimpleApp {
  router: RouterSingleton;
  databaseHandler: DatabaseHandler;
  constructor(router: RouterSingleton, databaseHandler: DatabaseHandler) {
    this.router = router;
    this.databaseHandler = databaseHandler;
    this.routes(databaseHandler.getInit());
  }

  protected routes(initDefault?: DatabaseHandlerInitializer): void {
    this.router.createRoutes(initDefault);
  }
}
