/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import DatabaseHandlerInitializer from '../database/databaseHandlerInitializer';
// @ts-ignore
export default class RouterSingleton {
  // @ts-ignore
  abstract createRoutes(initDefault?: DatabaseHandlerInitializer): void;
  protected static _instance: RouterSingleton;

  protected routes: Router;

  protected constructor() {
    this.routes = Router();
  }

  static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  getRoutes(): Router {
    return this.routes;
  }
}
