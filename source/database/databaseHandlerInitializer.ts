// file deepcode ignore no-any: any needed
import { Handler, DefaultInitializer } from 'flexiblepersistence';

export default interface DatabaseHandlerInitializer extends DefaultInitializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler?: Handler;
}
