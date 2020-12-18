import ControllerDeleteAdapter from './controllerDeleteAdapter';
import ControllerReadAdapter from './controllerReadAdapter';
import ControllerStoreAdapter from './controllerStoreAdapter';
import ControllerUpdateAdapter from './controllerUpdateAdapter';

export default interface ControllerAdapter
  extends ControllerStoreAdapter,
    ControllerDeleteAdapter,
    ControllerUpdateAdapter,
    ControllerReadAdapter {}
