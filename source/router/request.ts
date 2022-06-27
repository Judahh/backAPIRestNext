import { DatabaseHandler } from 'backapi';
import { RouterSingleton } from 'backapirest';
import controller from './controller';

const request = async (
  args,
  routerSingleton: RouterSingleton,
  databaseHandler: DatabaseHandler,
  name: string
): Promise<Promise<Response> | undefined> => {
  const currentController = await controller(
    routerSingleton,
    databaseHandler,
    name
  );
  return currentController?.mainRequestHandler.bind(currentController)(args);
};

export default request;
