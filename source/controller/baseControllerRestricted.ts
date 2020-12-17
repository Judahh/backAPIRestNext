/* eslint-disable @typescript-eslint/ban-ts-comment */
import ControllerRestrictedAdapter from '../adapter/controllerRestrictedAdapter';
import BaseControllerIndex from './baseControllerIndex';
import BaseControllerShow from './baseControllerShow';
import { Mixin } from 'ts-mixer';
// @ts-ignore
export default class BaseControllerRestricted
  // @ts-ignore
  extends Mixin(BaseControllerShow, BaseControllerIndex)
  implements ControllerRestrictedAdapter {}
