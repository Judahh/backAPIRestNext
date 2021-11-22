import { DatabaseHandler } from 'backapi';
import { BaseControllerDefault } from 'backapirest';
import RouterSingleton from './routerSingleton';
import stepIndex from './stepIndex';

const controller = (
  routerSingleton: RouterSingleton,
  databaseHandler: DatabaseHandler,
  name: string
): BaseControllerDefault | undefined => {
  return stepIndex(routerSingleton, databaseHandler)?.getController(name);
};

export default controller;
