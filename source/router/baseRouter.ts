import RouterSingleton from './routerSingleton';

export default (code: number, error: unknown): RouterSingleton =>
  ({
    getController: (name?: string) => {
      return {
        mainRequestHandler: (_req, res) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          res.status(code).send({
            error,
            name,
          });
        },
      };
    },
  } as RouterSingleton);
