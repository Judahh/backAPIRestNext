/* eslint-disable no-unused-vars */
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';

export default interface ControllerDeleteAdapter {
  delete(req: Request, res: Response): Promise<Response>;
}
