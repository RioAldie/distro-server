import supertest from 'supertest';

import { web } from '../application/web.js';
import { logger } from '../application/logging.js';
import {
  createTestUser,
  removeTestCloth,
  removeTestUser,
} from './test-util.js';

describe('POST /api/clothes/add', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestCloth();
    await removeTestUser();
  });

  it('should can add new cloth', async () => {
    const result = await supertest(web)
      .post('/api/clothes/add')
      .send({
        name: 'test-cloth',
        price: 189.999,
        image: 'not-found',
        stock: 100,
      })
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('test-cloth');
  });
  it('should reject add if data invalid', async () => {
    const result = await supertest(web)
      .post('/api/clothes/add')
      .send({
        name: '',
        price: 0,
        image: 'not-found',
        stock: 0,
      })
      .set('Authorization', 'test');

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it('should reject add if token invalid', async () => {
    const result = await supertest(web)
      .post('/api/clothes/add')
      .send({
        name: 'test-cloth',
        price: 189.999,
        image: 'not-found',
        stock: 100,
      })
      .set('Authorization', 'nope');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
describe('GET /api/clothes', function () {
  it('should get all clouthes', async () => {
    const result = await supertest(web).get('/api/clothes');

    expect(result.status).toBe(200);
    expect(result.body.data).toBeInstanceOf(Array);
  });
});
