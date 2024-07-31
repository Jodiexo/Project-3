// tests/auth.test.js

const request = require('supertest');
const app = require('../app'); // Adjust the path to your app.js
const knex = require('../db/knex'); // Adjust the path to your knex configuration

// Before all tests, run migrations and seed the database
beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

// After all tests, destroy the database connection
afterAll(async () => {
  await knex.destroy();
});

describe('POST /fix route', () => {
  it('should login a user and return a token', async () => {
    const response = await request(app)
      .post('/fix route')
      .send({
        username: 'johndoe', // Use a valid username from your seed data
        password: 'password123', // Use a valid password from your seed data
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 for invalid credentials', async () => {
    const response = await request(app)
      .post('/fix route')
      .send({
        username: 'wronguser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid username or password');
  });
});
