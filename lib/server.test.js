import request from 'supertest';
import { serve } from './server.js';

describe('The TCP server', () => {
  let server = null;

  beforeEach(() => {
    // Deliberately omit the port so we get an available one.
    server = serve('localhost', undefined);
  });

  afterEach(() => {
    server.close();
  });

  // This test will fail initially since the project doesn't start with a
  // working HTTP server.
  it('connects on the default port', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('GET route gets json data', async () => {
    await request(server)
    .get('/jsonData')
    .expect(200)
    .expect('Content-Type', 'application/json')
  });

  // it('throws 204 when trying to reach /mail', async () => {
  //   await request(server)
  //     .post('/mail').send({name: 'TK', type: 'cat', age: 3 })
  //     .expect(204);
  // });

  it('receives a 404 when requesting an unknown resource/method', async () => {
    await request(server)
      .put('/fictitious')
      .expect(404);
  });
});
