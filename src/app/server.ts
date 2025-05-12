import { createServer } from 'node:http';
import { requestListener } from '../handlers/requestListener';
import 'dotenv/config';

export const port = Number(process.env.PORT) || 4000;
export const server = createServer(requestListener);

export const startServer = () =>
  server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`),
  );
