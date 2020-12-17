/* eslint-disable @typescript-eslint/ban-ts-comment */
// file deepcode ignore no-any: any needed
// file deepcode ignore object-literal-shorthand: argh
import { Request, Response } from 'express';
import { ServiceModel, ServiceSimpleModel } from '@flexiblepersistence/service';
import { Default } from 'default-initializer';
import { Handler, Event, Operation } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import DatabaseHandlerInitializer from '../database/databaseHandlerInitializer';
settings.initFunction = 'init';
export default class BaseControllerDefault extends Default {
  protected errorStatus: {
    [error: string]: number;
  } = { Error: 400, error: 403, TypeError: 403, RemoveError: 400 };
  // @ts-ignore

  protected handler: Handler | undefined;

  constructor(initDefault?: DatabaseHandlerInitializer) {
    super(initDefault);
  }

  init(initDefault?: DatabaseHandlerInitializer): void {
    super.init(initDefault);
    if (initDefault) this.handler = initDefault.handler;
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

  protected generateName() {
    this.setName(this.getClassName().replace('Controller', this.getType()));
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
      const content = req.body as ServiceSimpleModel;
      const object = {};
      const filter = req.params?.filter as unknown;
      const name = this.constructor.name.replace('Controller', '');
      let single;
      if (singleDefault !== undefined) single = singleDefault;
      else single = (req.params?.single as unknown) as boolean;
      const event = new Event({
        operation,
        single: single,
        content: content,
        selection: filter,
        name: name,
      });

      // console.log('Event', event);

      if (this.getName())
        object[this.getName()] = (await useFunction(event))['receivedItem'];
      else throw new Error('Element is not specified.');
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
