import supertest from 'supertest';
import { prismaClient } from '../application/database.js';
import { web } from '../application/web.js';

describe('POST /api/users', function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: 'rioaldie',
      },
    });
  });

  it('should can register new user', async () => {
    const result = await supertest(web).post('/api/users').send({
      username: 'rioaldie',
      password: 'rahasia',
      email: 'rioaldierwanto@gmail.com',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('rioaldie');
    expect(result.body.data.password).toBe(undefined);
  });

  it('it should reject when request invalid', async () => {
    const result = await supertest(web).post('/api/users').send({
      username: '',
      password: '',
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if username already registered', async () => {
    let result = await supertest(web).post('/api/users').send({
      username: 'rioaldie',
      password: 'rahasia',
      email: 'rioaldierwanto@gmail.com',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('rioaldie');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post('/api/users').send({
      username: 'rioaldie',
      password: 'rahasia',
      email: 'rioaldierwanto@gmail.com',
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
