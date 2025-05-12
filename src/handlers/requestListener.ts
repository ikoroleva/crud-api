import { IncomingMessage, ServerResponse } from 'node:http';
import { usersRouter } from '../routes/users-router';
import { errorHandler } from './errorHandler';

export async function requestListener(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const url = req.url ?? '/';
    const [, api, resource, id] = url.split('/');

    if (api === 'api' && resource === 'users') {
      await usersRouter(req, res, id ?? null);
      return;
    }

    res.writeHead(404).end('Route not found');
  } catch (err) {
    errorHandler(res, err);
  }
}
