const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

describe('Specialty Routes', () => {
  let mongoServer;
  let authToken;
  let testSpecialty;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // Create a test patient for auth token
    const patientData = {
      firstName: "Admin",
      lastName: "User",
      email: "admin.specialty@email.com",
      dateOfBirth: "1990-01-01T00:00:00.000Z",
      address: { street: "1 Spec St", city: "Special Town" },
      phoneNumber: "9877 5566",
      password: "SpecialtyPassword123"
    };

    await request(app).post('/patients').send(patientData);
    
    const loginRes = await request(app)
      .post('/patients/login')
      .send({ email: patientData.email, password: patientData.password });
      
    authToken = loginRes.body.token;

  // Create a test specialty first for all tests to use
    const specialtyData = {
      specialtyName: 'Initial Test Specialty',
      description: 'Description for test specialty'
    };
    
    const createRes = await request(app)
      .post('/specialties')
      .set('Authorization', `Bearer ${authToken}`)
      .send(specialtyData);
      
    testSpecialty = createRes.body;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Test get all specialty
  test('GET /specialties should return all specialties', async () => {
    const res = await request(app).get('/specialties');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0); // one specailty already created in beforeAll
  });

  // Test get a specialty by id
  test('GET /specialties/:id should return a specific specialty', async () => {
    const res = await request(app).get(`/specialties/${testSpecialty._id}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('specialtyName', testSpecialty.specialtyName);
  });

  // Test get an invalid specialty
  test('GET /specialties/:id should return 404 for non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/specialties/${fakeId}`);
    
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status', 'error');
  });
  
  // Test create specialty
  test('POST /specialties should create a new specialty', async () => {
    const specialtyData = {
      specialtyName: 'Test Specialty',
      description: 'Description for test specialty'
    };
    
    const res = await request(app)
      .post('/specialties')
      .set('Authorization', `Bearer ${authToken}`)
      .send(specialtyData);
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('specialtyName', specialtyData.specialtyName);
    testSpecialty = res.body;
  });

  // Test update specialty
  test('PATCH /specialties/:id should update a specialty', async () => {
    const updateData = {
      specialtyName: 'Updated Specialty',
      description: 'Updated specialty description'
    };
    
    const res = await request(app)
      .patch(`/specialties/${testSpecialty._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('specialtyName', updateData.specialtyName);
  });

  // Test update invalid specialty
  test('PATCH /specialties/:id should return 404 for non-existent specialty', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const updateData = {
      specialtyName: 'Non-existent Specialty',
      description: 'This specialty does not exist'
    };
    
    const res = await request(app)
      .patch(`/specialties/${fakeId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);
      
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status', 'error');
  });

  // Test delete specialty
  test('DELETE /specialties/:id should delete a specialty', async () => {
    const res = await request(app)
      .delete(`/specialties/${testSpecialty._id}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('specialtyName','Updated Specialty', testSpecialty.specialtyName);
    
    // Verify it's deleted
    const getRes = await request(app).get(`/specialties/${testSpecialty._id}`);
    expect(getRes.status).toBe(404);
  });
});