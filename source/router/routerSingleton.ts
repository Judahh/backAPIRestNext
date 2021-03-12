/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseControllerDefault, RouterInitializer } from 'backapirest';
// @ts-ignore
export default class RouterSingleton {
  protected controller:
    | {
        [name: string]: BaseControllerDefault;
      }
    | undefined;
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  abstract createRoutes(initDefault?: RouterInitializer): void;
  protected static _instance: RouterSingleton;

  static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  getController() {
    return this.controller;
  }
}
