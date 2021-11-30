import { DatabaseHandler } from 'backapi';
import RouterSingleton from './routerSingleton';
import createRoutes from './createRoutes';
import timer from './timer';
import baseRouter from './baseRouter';
import HttpError from './httpError';

console.log('Initializing Routes...');
let dBHandler;
let done = false;
const useStep = process.env.USE_STEP
  ? process.env.USE_STEP.toLowerCase() === 'true' ||
    process.env.USE_STEP === '1'
  : false;

const stepIndex = async (
  routerSingleton: RouterSingleton,
  databaseHandler: DatabaseHandler
): Promise<RouterSingleton> => {
  try {
    if (dBHandler === undefined) {
      dBHandler = databaseHandler;
      if (useStep)
        throw new HttpError(503, 'Server still initializing, please try later');
    }
    if (useStep) {
      if (!done) {
        const stepSize = process.env.STEP_SIZE ? +process.env.STEP_SIZE : 1000;
        await Promise.race([
          timer(stepSize),
          createRoutes(
            routerSingleton,
            dBHandler.getInit(),
            dBHandler.getMauth ? dBHandler.getMauth() : undefined
          ),
        ]);
        done = true;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return routerSingleton.getInstance();
      }
      const error = new HttpError(
        503,
        'Server still initializing, please try later'
      );
      throw error;
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
    return baseRouter((error as HttpError).code | 500, error);
  }
};

export default stepIndex;
