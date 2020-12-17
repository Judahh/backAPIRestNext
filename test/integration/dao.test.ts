/* eslint-disable @typescript-eslint/no-this-alias */
import { ServiceHandler } from '@flexiblepersistence/service';
import { DAODB, Utils } from '../../source/index';
// import dBHandler from './dBHandler';

import DBHandler from './dBHandler';
import TestController from './testController';
import { Test } from './test.class';
import { mockResponse } from './response.mock';

import { Request, Response } from 'express';

test('store test, update, select all, select by id test and delete it', async (done) => {
  const pool = ((DBHandler.getReadHandler() as ServiceHandler)
    .persistence as DAODB).getPool();
  await Utils.init(pool);
  const handler = DBHandler.getHandler();
  const controller = new TestController(DBHandler.getInit());
  try {
    await handler.getWrite().clear();

    const sentTest = new Test();
    const sentTest2 = new Test();

    const store = await controller.store(
      ({
        body: sentTest,
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('store:', store);
    const storedTest = store['received'].Test;
    // console.log('storedTest:', storedTest);

    sentTest.id = storedTest.id;
    const expectedTest = { id: storedTest.id, name: null };
    // console.log('expectedTest:', expectedTest);

    expect(storedTest).toStrictEqual(expectedTest);

    const index = await controller.index(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('show:', show);
    const indexTest = index['received'].Test;
    expect(indexTest).toStrictEqual(expectedTest);

    const store2 = await controller.store(
      ({
        body: sentTest2,
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('store:', store);
    const storedTest2 = store2['received'].Test;
    // console.log('storedTest2:', storedTest);

    sentTest2.id = storedTest2.id;
    const expectedTest2 = { id: storedTest2.id, name: null };
    // console.log('expectedTest:', expectedTest);

    expect(storedTest2).toStrictEqual(expectedTest2);

    const show = await controller.show(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const showTest = show['received'].Test;
    // console.log('showTest:', showTest);
    const expectedTests = [storedTest, storedTest2];
    expect(showTest).toStrictEqual(expectedTests);

    const sentTest3 = { name: 'Test' };

    const update = await controller.update(
      ({
        body: sentTest3,
        params: {
          filter: { id: storedTest2.id },
          single: false,
        },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('storedTest2:', storedTest2);

    const updatedTest = update['received'].Test;
    // console.log('updatedTest:', updatedTest);
    const expectedUpdatedTest = { id: storedTest2.id, name: sentTest3.name };
    // console.log('expectedUpdatedTest:', expectedUpdatedTest);
    expect(updatedTest).toStrictEqual(expectedUpdatedTest);

    const show2 = await controller.show(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const showTest2 = show2['received'].Test;
    // console.log('showTest2:', showTest2);
    const expectedTests2 = [storedTest, updatedTest];
    // console.log('expectedTests2:', expectedTests2);

    expect(showTest2).toStrictEqual(expectedTests2);

    const deleted = await controller.delete(
      ({
        params: {
          filter: { id: storedTest2.id },
        },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const deletedTest = deleted['received'].Test;
    // console.log('deletedTest:', deletedTest);
    const expectedDeletedTest = true;
    // console.log('expectedDeletedTest:', expectedDeletedTest);
    expect(deletedTest).toStrictEqual(expectedDeletedTest);

    const show3 = await controller.show(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const showTest3 = show3['received'].Test;
    // console.log('showTest3:', showTest3);
    const expectedTests3 = [storedTest];
    expect(showTest3).toStrictEqual(expectedTests3);
  } catch (error) {
    console.error(error);
    await handler.getWrite().clear();
    await Utils.end(pool);
    expect(error).toBe(null);
    done();
  }
  await handler.getWrite().clear();
  await Utils.end(pool);
  done();
});
