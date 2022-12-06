import TPromise from 'thread-promises';

const timer = (ms: number): TPromise<unknown[], boolean, boolean> => {
  return new TPromise((resolve) =>
    setTimeout(() => {
      resolve(false);
    }, ms)
  );
};
export default timer;
