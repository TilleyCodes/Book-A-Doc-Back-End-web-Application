const request = require('supertest');
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server');
const app = require('../app');
const Patient = require('../models/patient');

describe('Medical Centre Routes', () => {
  let mongoServer;
  let authToken;
  let testMedicalCentre = {
    medicalCentreName: 'World Square Medical Centre',
    operatingHours: '8am - 6pm',
    address: {
      street: '1 Shelley St',
      city: 'Sydney',
    },
    contacts: {
      email: 'worldsquaremc@email.com',
      phone: '+61 39735 8466',
    },
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // Create a test patient / admin and get auth token
    const testPatient = {
      firstName: "Admin",
      lastName: "User",
      email: "admin@email.com",
      dateOfBirth: "1990-01-01T00:00:00.000Z",
      address: { street: "123 Admin St", city: "Adminville" },
      phoneNumber: "1234567890",
      password: "AdminPassword123"
    };

    await request(app).post('/patients').send(testPatient);
    
    const loginRes = await request(app)
      .post('/patients/login')
      .send({ email: testPatient.email, password: testPatient.password });
      
    authToken = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Test get all Medical Centres
  test('GET ALL /medicalCentres should return all medical centres', async () => {
    const res = await request(app).get('/medicalCentres');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test get a single medical centre
  test('GET /medicalCentres/:id should return medical centre by id', async () => {
    const res = await request(app).get(`/medicalCentres/${testMedicalCentre.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('medicalCentreName', testMedicalCentre.medicalCentreName);
  });
  
  // Test create medical centre
  test('POST /medicalCentres should create a new medical centre', async () => {
    const res = await request(app)
      .post('/medicalCentres')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testMedicalCentre);
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('medicalCentreName', testMedicalCentre.medicalCentreName);
    testMedicalCentre.id = res.body._id;
  });

  // Test update medical centre
  test('PATCH /medicalCentres/:id should update a specific medical centre', async () => {
    const updatedData = {
      medicalCentreName: 'Updated Medical Centre',
      operatingHours: '8am - 6pm',
      address: {
        street: '456 Updated St',
        city: 'Updated City',
      },
      contacts: {
        email: 'updated@email.com',
        phone: '0987654321',
      },
    };

    const res = await request(app)
      .patch(`/medicalCentres/${testMedicalCentre.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedData);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('medicalCentreName', updatedData.medicalCentreName);
  });

  // Test delete medical centre
  test('DELETE /medicalCentres/:id should delete a specific medical centre', async () => {
    const res = await request(app)
      .delete(`/medicalCentres/${testMedicalCentre.id}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    expect(res.status).toBe(200);
    
    // Verify it's deleted
    const getRes = await request(app).get(`/medicalCentres/${testMedicalCentre.id}`);
    expect(getRes.status).toBe(404);
  });
});
