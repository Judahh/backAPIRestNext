import { DatabaseHandler } from 'backapi';
import RouterSingleton from './routerSingleton';
import createRoutes from './createRoutes';
import timer from './timer';
import baseRouter from './baseRouter';

console.log('Initializing Routes...');
let dBHandler;
let done = false;
let error: Error | undefined;
const useStep = process.env.USE_STEP
  ? process.env.USE_STEP.toLowerCase() === 'true' ||
    process.env.USE_STEP === '1'
  : false;

const stepIndex = (
  routerSingleton: RouterSingleton,
  databaseHandler: DatabaseHandler
): RouterSingleton => {
  try {
    if (dBHandler === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      dBHandler = databaseHandler;
    }
    if (useStep) {
      if (!done) {
        const stepSize = process.env.STEP_SIZE ? +process.env.STEP_SIZE : 1000;
        Promise.race([
          timer(stepSize),
          createRoutes(
            routerSingleton,
            dBHandler.getInit(),
            dBHandler.getMauth ? dBHandler.getMauth() : undefined
          ),
        ])
          .then((finished: boolean) => {
            done = finished;
          })
          .catch((promiseError: Error) => {
            error = promiseError;
            console.error('Promise error:', error);
            return baseRouter(500, error);
          });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return routerSingleton.getInstance();
      }
      if (error) {
        throw error;
      }
      return baseRouter(503, 'Server still initializing, please try later');
    } else {
      if (!done) {
        createRoutes(
          routerSingleton,
          dBHandler.getInit(),
          dBHandler.getMauth ? dBHandler.getMauth() : undefined
        );
        done = true;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return routerSingleton.getInstance();
    }
  } catch (error) {
    console.error('Error:', error);
    return baseRouter(500, error);
  }
};

export default stepIndex;
