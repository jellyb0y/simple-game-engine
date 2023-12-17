import { Request, Response } from 'express';
import { readFileSync } from 'fs';

import { INSTANCE_ID } from './instance';

export const examplesHandler = (req: Request, res: Response) => {
  const exampleName = req.path.match(/^\/(.+)$/)?.[1];

  if (!exampleName) {
    return res.status(404).json({
      error: 'example not specified',
    });
  }

  let indexFile = readFileSync(`${__dirname}/../public/index.html`).toString();

  indexFile = indexFile.replace('[[INSTANCE_ID]]', INSTANCE_ID);
  indexFile = indexFile.replace('[[lib]]', `/static/lib.js`);
  indexFile = indexFile.replace('[[script]]', `/static/example-${exampleName}.js`);

  res.send(indexFile);
};
