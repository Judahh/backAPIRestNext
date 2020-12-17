// file deepcode ignore no-any: any needed
import { Handler } from 'flexiblepersistence';
import { DefaultInitializer } from 'default-initializer';

export default interface DatabaseHandlerInitializer extends DefaultInitializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler?: Handler;
}
