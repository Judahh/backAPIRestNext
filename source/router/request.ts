import { DatabaseHandler } from 'backapi';
import controller from './controller';
import RouterCreator from './routerCreator';

const request = (
  req: Request,
  res: Response,
  routerSingleton: RouterCreator,
  databaseHandler: DatabaseHandler,
  name: string
): Promise<Response> | undefined => {
  const currentController = controller(routerSingleton, databaseHandler, name);
  return currentController?.mainRequestHandler.bind(currentController)(
    req,
    res
  );
};

export default request;
