import TPromise from 'thread-promises';
import RouterCreator from './routerCreator';

const createRoutes = (
  router: RouterCreator,
  ...args: unknown[]
): TPromise<boolean> => {
  return new TPromise((resolve) => {
    router.getInstance().createRoutes(...args);
    resolve(true);
  });
};
export default createRoutes;
