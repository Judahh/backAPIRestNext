/* eslint-disable @typescript-eslint/ban-ts-comment */
import ControllerAdapter from '../adapter/controllerAdapter';
import BaseControllerRestricted from './baseControllerRestricted';
import BaseControllerReserved from './baseControllerReserved';
import { Mixin } from 'ts-mixer';

// @ts-ignore
export default class BaseController
  extends Mixin(BaseControllerReserved, BaseControllerRestricted)
  implements ControllerAdapter {}
