/* eslint-disable @typescript-eslint/ban-ts-comment */
import ControllerAdapter from '../adapter/controllerAdapter';
import { Mixin } from 'ts-mixer';
import BaseControllerDelete from './baseControllerDelete';
import BaseControllerStore from './baseControllerStore';
import BaseControllerUpdate from './baseControllerUpdate';
import BaseControllerRead from './baseControllerRead';

// @ts-ignore
export default class BaseController
  extends Mixin(
    BaseControllerStore,
    BaseControllerDelete,
    BaseControllerUpdate,
    BaseControllerRead
  )
  implements ControllerAdapter {
  protected method: {
    [method: string]: string;
  } = {
    GET: 'read',
    POST: 'store',
    PUT: 'update',
    PATCH: 'update',
    DELETE: 'delete',
  };
  handlerRequest(req: Request, res: Response): Promise<Response> {
    return this[this.method[req.method]](req, res);
  }
}
