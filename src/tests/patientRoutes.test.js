const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

describe('Patient Routes', () => {
  let mongoServer;
  let testPatient;
  let authToken;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Test create patient
  test('POST /patients should create a new patient', async () => {
    const patientData = {
      firstName: "Test",
      lastName: "Patient",
      email: "test.patient@email.com",
      dateOfBirth: "1990-01-01T00:00:00.000Z",
      address: { street: "8 Test St", city: "Test Town" },
      phoneNumber: "9878 2233",
      password: "TestPassword1234"
    };
    
    const res = await request(app)
      .post('/patients')
      .send(patientData);
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.newPatient).toHaveProperty('firstName', patientData.firstName);
    testPatient = res.body.newPatient;
    
    // Login to get auth token
    const loginRes = await request(app)
      .post('/patients/login')
      .send({ email: patientData.email, password: patientData.password });
      
    authToken = loginRes.body.token;
  });

  // Test patient login auth
  test('POST /patients/login should authenticate a patient', async () => {
    const loginData = {
      email: "test.patient@email.com",
      password: "TestPassword1234"
    };
    
    const res = await request(app)
      .post('/patients/login')
      .send(loginData);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('status', 'success');
  });

  // Test login error for invalid patient password
  test('POST /patients/login should return 401 for wrong password', async () => {
    const loginData = {
      email: "test.patient@email.com",
      password: "Password124"
    };
    
    const res = await request(app)
      .post('/patients/login')
      .send(loginData);
      
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('status', 'error');
  });

  // Test get all Patients
  test('GET /patients should return all patients', async () => {
    const res = await request(app).get('/patients');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    
    // Validate age requirement must be 18 or over
    res.body.forEach(patient => {
      const dob = new Date(patient.dateOfBirth);
      const diffMs = Date.now() - dob.getTime();
      const ageDate = new Date(diffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      
      expect(age).toBeGreaterThanOrEqual(18);
    });
  });

  // Test get a single patient by id
  test('GET /patients/:id should return a specific patient', async () => {
    const res = await request(app).get(`/patients/${testPatient._id}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('firstName', testPatient.firstName);
  });

  // test get patient profile with successful auth
  test('GET /patients/profile should return patient profile when authenticated', async () => {
    const res = await request(app)
      .get('/patients/profile')
      .set('Authorization', `Bearer ${authToken}`);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('firstName', testPatient.firstName);
  });

  // Test get patient profile with unsuccessful auth
  test('GET /patients/profile should return 401 when not authenticated', async () => {
    const res = await request(app).get('/patients/profile');
    
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('status', 'error');
  });

  // test update patient
  test('PATCH /patients/:id should update a patient', async () => {
    const updateData = {
      firstName: "Updated",
      lastName: "Patient",
      email: "test.patient@email.com",
      dateOfBirth: "1990-01-01T00:00:00.000Z",
      address: { street: "5 Up St", city: "Dated" },
      phoneNumber: "9934 6577",
      password: "TestPassword1234"
    };
    
    const res = await request(app)
      .patch(`/patients/${testPatient._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('firstName', updateData.firstName);
  });

  // Test Delete patient
  test('DELETE /patients/:id should delete a patient', async () => {
    const res = await request(app)
      .delete(`/patients/${testPatient._id}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('firstName', 'Updated');
    
    // Verify it's deleted
    const getRes = await request(app).get(`/patients/${testPatient._id}`);
    expect(getRes.status).toBe(404);
  });
});