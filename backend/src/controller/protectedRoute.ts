import { Request, Response } from 'express';

export const protectedRouter = (req: Request, res: Response) => {
  res.send('This is protected router');
}