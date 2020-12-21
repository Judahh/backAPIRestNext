/* eslint-disable @typescript-eslint/ban-ts-comment */
// file deepcode ignore no-any: any needed
// file deepcode ignore object-literal-shorthand: argh
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import { ServiceModel, ServiceSimpleModel } from '@flexiblepersistence/service';
import { Handler, Event, Operation, Default } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import RouterInitializer from '../router/routerInitializer';
settings.initFunction = 'init';
export default class BaseControllerDefault extends Default {
  protected errorStatus: {
    [error: string]: number;
  } = {
    Error: 400,
    RemoveError: 400,
    Unauthorized: 401,
    error: 403,
    TypeError: 403,
    NotFound: 404,
  };
  protected method: {
    [method: string]: string;
  } = {
    GET: 'read',
    POST: 'store',
    PUT: 'update',
    PATCH: 'update',
    DELETE: 'delete',
  };
  // @ts-ignore
  protected handler: Handler | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected middlewares?: any[];
  handlerRequest(req: Request, res: Response): Promise<Response> {
    if (req.method) return this[this.method[req.method]](req, res);
    const error = new Error('Missing HTTP method.');
    throw error;
  }

  constructor(initDefault?: RouterInitializer) {
    super(initDefault);
  }

  init(initDefault?: RouterInitializer): void {
    super.init(initDefault);
    if (initDefault) {
      this.handler = initDefault.handler;
      this.middlewares = initDefault.middlewares;
    }
    // console.log(this.handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async event(event: Event): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!this.journaly) reject(new Error('No journaly connected!'));
      if (this.handler) {
        this.handler
          .addEvent(event)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      } else reject(new Error('No handler connected!'));
    });
  }

  protected runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }

  protected async runMiddlewares(req, res) {
    if (this.middlewares)
      for (const middleware of this.middlewares)
        await this.runMiddleware(req, res, middleware);
  }

  protected generateName() {
    this.setName(this.getClassName().replace('Controller', this.getType()));
  }

  protected generateError(res: Response, error) {
    if ((error.message as string).includes('does not exist'))
      error.name = 'NotFound';
    res.status(this.errorStatus[error.name]).send({ error: error.message });
    return res;
  }

  protected async generateEvent(
    req: Request,
    res: Response,
    operation: Operation,
    useFunction: (
      // eslint-disable-next-line no-unused-vars
      event: Event
    ) => Promise<ServiceModel[] | ServiceModel | number | boolean>,
    singleDefault?: boolean
  ): Promise<Response> {
    try {
      await this.runMiddlewares(req, res);
      const content = req.body as ServiceSimpleModel;
      const object = {};
      const { query } = req;
      const params = req['params'];
      let selection;
      //  deepcode ignore HTTPSourceWithUncheckedType: params do not exist on next
      let single;
      if (params) {
        if (params.filter) selection = params.filter;
        else selection = query as any;
        single = params.single as boolean;
      }
      const name = this.getClassName().replace('Controller', '');
      // console.log(single);
      if (singleDefault !== undefined && single === undefined)
        single = singleDefault;
      const event = new Event({
        operation,
        single: single,
        content: content,
        selection: selection,
        name: name,
      });
      // console.log(event);
      // console.log(selection);
      // console.log(singleDefault);
      // console.log(req);
      if (this.getName())
        object[this.getName()] = (await useFunction(event))['receivedItem'];
      else throw new Error('Element is not specified.');
      res.status(200).json(object);
      return res;
    } catch (error) {
      return this.generateError(res, error);
    }
  }
}
