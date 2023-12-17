import express from 'express';

import { instanceHandler } from './handlers/instance';
import { examplesHandler } from './handlers/examples';

const PORT = Number(process.env.PORT);

const server = express();

server.use(express.json());
server.use('/static', express.static(`${__dirname}/../dist/`));

server.get('/instance', instanceHandler);
server.get('/*', examplesHandler);

server.listen(PORT, () => {
   console.log('Server is listening on port:', PORT); 
});
