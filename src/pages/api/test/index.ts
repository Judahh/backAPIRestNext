import DBHandler from '../../../../test/integration/dBHandler';
import TestController from '../../../../test/integration/testController';

const controller = new TestController(DBHandler.getInit());

export default controller.handlerRequest.bind(controller);
