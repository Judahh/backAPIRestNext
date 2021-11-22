import { DatabaseHandler } from 'backapi';
import RouterSingleton from './routerSingleton';
import createRoutes from './createRoutes';
import timer from './timer';
import RouterCreator from './routerCreator';
import baseRouter from './baseRouter';

console.log('Initializing Routes...');
let dBHandler;
let done = false;
const useStep = process.env.USE_STEP
  ? process.env.USE_STEP.toLowerCase() === 'true' ||
    process.env.USE_STEP === '1'
  : false;

const stepIndex = (
  routerSingleton: RouterCreator,
  databaseHandler: DatabaseHandler
): RouterSingleton => {
  if (useStep) {
    if (dBHandler === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      dBHandler = databaseHandler;
    } else if (!done) {
      try {
        const stepSize = process.env.STEP_SIZE ? +process.env.STEP_SIZE : 1000;
        Promise.race([
          timer(stepSize),
          createRoutes(
            routerSingleton,
            dBHandler.getInit(),
            dBHandler.getMauth()
          ),
        ]).then((finished: boolean) => {
          done = finished;
          console.log('finished:', finished);
        });
      } catch (error) {
        console.log('error:', error);
        return baseRouter(500, error);
      }
    } else {
      return routerSingleton.getInstance() as RouterSingleton;
    }
    return baseRouter(503, 'Server still initializing, please try later');
  } else {
    if (dBHandler === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      dBHandler = databaseHandler;
    }
    if (!done) {
      createRoutes(routerSingleton, dBHandler.getInit(), dBHandler.getMauth());
    }
    return routerSingleton.getInstance() as RouterSingleton;
  }
};

export default stepIndex;
