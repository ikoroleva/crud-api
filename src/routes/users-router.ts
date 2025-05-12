// src/routes/usersRouter.ts
import { usersService } from '../services/usersService';
import { IncomingMessage, ServerResponse } from 'node:http';
import { readBody } from '../utils/bodyParser';

const send = (res: ServerResponse, status: number, body?: unknown) => {
  const json = body ? JSON.stringify(body) : undefined;
  res.writeHead(status, { 'Content-Type': 'application/json' }).end(json);
};

export async function usersRouter(
  req: IncomingMessage,
  res: ServerResponse,
  id: string | null,
) {
  try {
    if (req.method === 'GET' && !id) {
      const users = usersService.getAll();
      return send(res, 200, users);
    }

    if (req.method === 'GET' && id) {
      const user = usersService.getOne(id);
      return send(res, 200, user);
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const created = usersService.create(body);
      return send(res, 201, created);
    }

    if (req.method === 'PUT' && id) {
      const body = await readBody(req);
      const updated = usersService.update(id, body);
      return send(res, 200, updated);
    }

    if (req.method === 'DELETE' && id) {
      usersService.remove(id);
      return send(res, 204);
    }

    return send(res, 404, 'Route not found');
  } catch (err) {
    throw err;
  }
}
