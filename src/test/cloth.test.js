import supertest from 'supertest';

import { web } from '../application/web.js';
import { logger } from '../application/logging.js';
import {
  createTestUser,
  removeTestCloth,
  removeTestUser,
} from './test-util.js';

describe('POST /api/clothes/add', function () {
  afterEach(async () => {
    await removeTestCloth();
  });

  it('should can add new cloth', async () => {
    const result = await supertest(web)
      .post('/api/clothes/add')
      .send({
        name: 'test-cloth',
        price: 189.999,
        image: 'not-found',
        stock: 100,
      });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('test-cloth');
  });
});
