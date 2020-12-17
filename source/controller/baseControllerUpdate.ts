/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import BaseControllerDefault from './baseControllerDefault';
import ControllerUpdateAdapter from '../adapter/controllerUpdateAdapter';
import { Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerUpdate
  extends BaseControllerDefault
  implements ControllerUpdateAdapter {
  async update(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.update,
      this.event.bind(this)
    );
  }
}
