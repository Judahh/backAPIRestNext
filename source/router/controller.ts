import { DatabaseHandler } from 'backapi';
import { BaseControllerDefault } from 'backapirest';
import RouterCreator from './routerCreator';
import stepIndex from './stepIndex';

const controller = (
  routerSingleton: RouterCreator,
  databaseHandler: DatabaseHandler,
  name: string
): BaseControllerDefault | undefined => {
  return stepIndex(routerSingleton, databaseHandler)?.getController(name);
};

export default controller;
