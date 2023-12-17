import { Request, Response } from 'express';

export const INSTANCE_ID = `${Math.random()}:${Date.now()}`;

export const instanceHandler = (req: Request, res: Response) => {
  res.json({ instance: INSTANCE_ID });
};
