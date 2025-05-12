import http from 'node:http';
import { server } from '../app/server';
import { UserEntity } from '../models/user';

const PORT = Number(process.env.PORT) || 4000;
const address = `http://localhost:${PORT}/api/users`;

beforeAll((done) => {
  server.listen(PORT, done);
});

afterAll((done) => {
  server.close(done);
});

const request = (
  method: string,
  path = '',
  body?: unknown,
): Promise<{ status: number; body: unknown }> =>
  new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : undefined;

    const req = http.request(
      address + path,
      { method, headers: { 'Content-Type': 'application/json' } },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));

        res.on('end', () => {
          let parsed: unknown = raw;

          if (raw) {
            try {
              parsed = JSON.parse(raw);
            } catch {}
          } else {
            parsed = undefined;
          }

          resolve({ status: res.statusCode ?? 0, body: parsed });
        });
      },
    );

    if (data) req.write(data);
    req.end();
  });

describe('CRUD flow', () => {
  let created: UserEntity;
  it('GET empty', async () => {
    const res = await request('GET');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('POST create', async () => {
    const payload = { username: 'Bob', age: 30, hobbies: ['fishing'] };
    const res = await request('POST', '', payload);
    created = res.body as UserEntity;
    expect(res.status).toBe(201);
    expect(created).toMatchObject(payload);
  });
  it('GET one', async () => {
    const res = await request('GET', `/${created.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(created);
  });
  it('PUT update', async () => {
    const res = await request('PUT', `/${created.id}`, { age: 31 });
    expect(res.status).toBe(200);
    expect((res.body as UserEntity).age).toBe(31);
  });
  it('DELETE', async () => {
    const res = await request('DELETE', `/${created.id}`);
    expect(res.status).toBe(204);
    const next = await request('GET', `/${created.id}`);
    expect(next.status).toBe(404);
  });
});
