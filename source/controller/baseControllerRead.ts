/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import ControllerReadAdapter from '../adapter/controllerReadAdapter';
import { Mixin } from 'ts-mixer';
import BaseControllerShow from './baseControllerShow';
import BaseControllerIndex from './baseControllerIndex';
// @ts-ignore
export default class BaseControllerRead
  extends Mixin(BaseControllerIndex, BaseControllerShow)
  implements ControllerReadAdapter {
  async read(req: Request, res: Response): Promise<Response> {
    if (Object.keys(req['query']).length !== 0 && req['query'].id)
      return this.index(req, res);
    return this.show(req, res);
  }
}
