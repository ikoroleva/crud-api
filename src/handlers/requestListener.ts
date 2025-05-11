import { IncomingMessage, ServerResponse } from 'node:http';
import { usersRouter } from '../routes/users-router';

export async function requestListener(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const url = req.url ?? '/';
    const [_, api, resource, id] = url.split('/');
    if (api === 'api' && resource === 'users') {
      return usersRouter(req, res, id ?? null);
    }
    res.writeHead(404).end('Route not found');
  } catch (err) {
    console.error(err);
  }
}