const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;

jest.setTimeout(30000); // increase timeout for slow MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri;

  // Import app after setting MONGO_URI
  app = require('../../src/index'); // your Express app (without listen)
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  // Clear DB after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe('Bug API', () => {
  it('POST /api/bugs - create bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'desc' })
      .expect(201);

    expect(res.body.title).toBe('Test bug');
  });

  it('GET /api/bugs - list bugs', async () => {
    await request(app).post('/api/bugs').send({ title: 'Bug1', description: 'desc' });

    const res = await request(app).get('/api/bugs').expect(200);
    expect(res.body.length).toBe(1);
  });

  it('PUT /api/bugs/:id - update status', async () => {
    const createRes = await request(app).post('/api/bugs').send({ title: 'Bug', description: 'desc' });
    const id = createRes.body._id;

    const res = await request(app).put(`/api/bugs/${id}`).send({ status: 'resolved' }).expect(200);
    expect(res.body.status).toBe('resolved');
  });

  it('DELETE /api/bugs/:id - delete bug', async () => {
    const createRes = await request(app).post('/api/bugs').send({ title: 'Bug', description: 'desc' });
    const id = createRes.body._id;

    await request(app).delete(`/api/bugs/${id}`).expect(204);
  });
});
