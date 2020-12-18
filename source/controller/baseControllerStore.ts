/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import BaseControllerDefault from './baseControllerDefault';
import ControllerStoreAdapter from '../adapter/controllerStoreAdapter';
import { Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerStore
  extends BaseControllerDefault
  implements ControllerStoreAdapter {
  // @ts-ignore
  async store(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.create,
      this.event.bind(this),
      true
    );
  }
}
