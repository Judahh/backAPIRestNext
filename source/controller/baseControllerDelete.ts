/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import BaseControllerDefault from './baseControllerDefault';
import ControllerDeleteAdapter from '../adapter/controllerDeleteAdapter';
import { Operation } from 'flexiblepersistence';
// @ts-ignore
export default class BaseControllerDelete
  extends BaseControllerDefault
  implements ControllerDeleteAdapter {
  async delete(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.delete,
      this.event.bind(this)
    );
  }
}
