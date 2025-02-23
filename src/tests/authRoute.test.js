const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

describe('Protected route /patients/profile', () => {
  let validToken;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Seed the database by creating a patient (registration)
    const newPatientData = {
      firstName: "Jeff",
      lastName: "Test",
      email: "mynameisjeff@gmail.com",
      dateOfBirth: "1990-01-01T00:00:00.000Z",
      address: { street: "123 Test St", city: "Testville" },
      phoneNumber: "1234567890",
      password: "DaBestPasswordEva4Jeff"
    };

    // Create patient
    await request(app)
      .post('/patients')
      .send(newPatientData);

    // Log in to obtain valid token
    const res = await request(app)
      .post('/patients/login')
      .send({ email: 'mynameisjeff@gmail.com', password: 'DaBestPasswordEva4Jeff'});
    validToken = res.body.token;
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
    });

    test('Should return patient profile with valid token', async () => {
      const res = await request(app)
        .get('/patients/profile')
        .set('Authorization', `Bearer ${validToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
    });
})