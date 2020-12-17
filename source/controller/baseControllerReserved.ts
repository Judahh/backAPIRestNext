/* eslint-disable @typescript-eslint/ban-ts-comment */
import ControllerReservedAdapter from '../adapter/controllerReservedAdapter';
import { Mixin } from 'ts-mixer';
import BaseControllerStore from './baseControllerStore';
import BaseControllerDelete from './baseControllerDelete';
import BaseControllerUpdate from './baseControllerUpdate';

// @ts-ignore
export default class BaseControllerReserved
  // @ts-ignore
  extends Mixin(BaseControllerStore, BaseControllerDelete, BaseControllerUpdate)
  implements ControllerReservedAdapter {}
