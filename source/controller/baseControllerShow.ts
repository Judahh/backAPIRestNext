/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import ControllerShowAdapter from '../adapter/controllerShowAdapter';
import BaseControllerDefault from './baseControllerDefault';
import { Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerShow
  extends BaseControllerDefault
  implements ControllerShowAdapter {
  async show(req: Request, res: Response): Promise<Response> {
    // console.log('SHOW');
    return this.generateEvent(
      req,
      res,
      Operation.read,
      this.event.bind(this),
      false
    );
  }
}
