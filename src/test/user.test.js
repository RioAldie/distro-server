import supertest from 'supertest';
import { prismaClient } from '../application/database.js';
import { web } from '../application/web.js';
import { createTestUser, removeTestUser } from './test-util.js';

describe('POST /api/users', function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result = await supertest(web).post('/api/users').send({
      username: 'test',
      password: 'rahasia',
      email: 'test@gmail.com',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
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
      username: 'test',
      password: 'rahasia',
      email: 'test@gmail.com',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post('/api/users').send({
      username: 'test',
      password: 'rahasia',
      email: 'test@gmail.com',
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe('POST /api/users/login', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
  });
  it('should reject login if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: '',
        password: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
  it('should reject login if username is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'salah',
        password: 'salah',
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'salah',
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});
