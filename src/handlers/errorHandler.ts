import { ServerResponse } from 'node:http';

export const errorHandler = (
  res: ServerResponse,
  err: unknown,
): ServerResponse => {
  if (err instanceof SyntaxError) return res.writeHead(400).end(err.message);
  if (err instanceof TypeError) return res.writeHead(400).end(err.message);
  if (err instanceof ReferenceError) return res.writeHead(404).end(err.message);
  console.error(err);
  return res.writeHead(500).end('Internal server error');
};
