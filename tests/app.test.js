const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
  // Тест 1: Главная страница
  test('GET / should return welcome message', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Hello from CI/CD Lab App!');
  });

  // Тест 2: Health check
  test('GET /health should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
  });

  // Тест 3: API с данными
  test('GET /api/data should return data array', async () => {
    const response = await request(app)
      .get('/api/data')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('total', 3);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
