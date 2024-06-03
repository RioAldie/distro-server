import supertest from 'supertest';

import { web } from '../application/web.js';
import {
  createTestUser,
  getTestUser,
  removeTestUser,
} from './test-util.js';
import bcrypt from 'bcrypt';

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
    expect(result.body.errors).toBeDefined();
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
    expect(result.body.errors).toBeDefined();
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
    expect(result.body.errors).toBeDefined();
  });
  it('should reject login if username is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'salah',
        password: 'salah',
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'salah',
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
describe('GET /api/users/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
describe('PATCH /api/users/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can update user', async () => {
    const result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', 'test')
      .send({
        email: 'test2@gmail.com',
        password: 'rahasiabesar',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');

    const user = await getTestUser();
    expect(await bcrypt.compare('rahasiabesar', user.password)).toBe(
      true
    );
  });

  it('should can update user email', async () => {
    const result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', 'test')
      .send({
        email: 'test2@gmail.com',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.email).toBe('test2@gmail.com');
  });

  it('should can update user password', async () => {
    const result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', 'test')
      .send({
        password: 'rahasiabesar',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');

    const user = await getTestUser();
    expect(await bcrypt.compare('rahasiabesar', user.password)).toBe(
      true
    );
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', 'salah')
      .send({});

    expect(result.status).toBe(401);
  });
});
