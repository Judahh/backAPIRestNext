import { DatabaseHandler } from 'backapi';
import RouterSingleton from './routerSingleton';
import controller from './controller';

const request = (
  req: Request,
  res: Response,
  routerSingleton: RouterSingleton,
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
