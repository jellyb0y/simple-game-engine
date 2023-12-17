import express from 'express';

import { instanceHandler } from './handlers/instance';
import { examplesHandler } from './handlers/examples';
import { notFoundHandler } from './handlers/notFound';

const PORT = Number(process.env.PORT);

const server = express();

server.use(express.json());
server.use('/lib', express.static(`${__dirname}/../dist/`));
server.use('/static', express.static(`${__dirname}/../examples/`));

server.get('/instance', instanceHandler);
server.get('/*', examplesHandler);
server.use('*', notFoundHandler);

server.listen(PORT, () => {
   console.log('Server is listening on port:', PORT); 
});
