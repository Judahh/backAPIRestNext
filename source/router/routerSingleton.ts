/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import DatabaseHandlerInitializer from '../database/databaseHandlerInitializer';
// @ts-ignore
export default class RouterSingleton {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  abstract createRoutes(initDefault?: DatabaseHandlerInitializer): void;
  protected static _instance: RouterSingleton;

  protected main: any;

  static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  getMain() {
    return this.main;
  }
}
