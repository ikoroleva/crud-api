import { IncomingMessage } from 'node:http';

export const readBody = <T = object>(req: IncomingMessage): Promise<T> =>
  new Promise((resolve, reject) => {
    let data = '';
    req
      .on('data', (chunk) => (data += chunk))
      .on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : ({} as T));
        } catch (e) {
          reject(new Error('Invalid JSON'));
        }
      })
      .on('error', reject);
  });
