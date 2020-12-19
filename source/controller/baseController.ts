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
  implements ControllerAdapter {}
