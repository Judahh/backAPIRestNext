/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// file deepcode ignore no-any: any needed
// file deepcode ignore object-literal-shorthand: argh
import { Handler, MongoDB, PersistenceInfo } from 'flexiblepersistence';
import { Journaly, SubjectObserver, DatabaseHandler } from '../../source/index';
import TestService from './testService';
import { eventInfo, readInfo } from './databaseInfos';
import { ServiceHandler } from '@flexiblepersistence/service';

const journaly = Journaly.newJournaly() as SubjectObserver<any>;
const readDatabase = new PersistenceInfo(readInfo, journaly);
const eventDatabase = new PersistenceInfo(eventInfo, journaly);

const database = new MongoDB(readDatabase);

const read = new ServiceHandler(
  readDatabase,
  {
    test: new TestService(),
  },
  database
);
const write = new MongoDB(eventDatabase);
// console.log(journaly.getSubjects());
const handler = new Handler(write, read);
export default DatabaseHandler.getInstance({
  handler: handler,
  journaly: journaly,
}) as DatabaseHandler;
