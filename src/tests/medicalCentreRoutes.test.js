const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const MedicalCentre = require('../models/medicalCentre');

const sampleMedicalCentre = {
  medicalCentreName: 'City Medical Center',
  operatingHours: '9:00 AM - 5:00 PM',
  address: {
    street: '123 Health Street',
    city: 'Melbourne',
  },
  contacts: {
    email: 'city.medical@example.com',
    phone: '0400 123 456',
  },
};

describe('Medical Centre Routes', () => {
  beforeEach(async () => {
    await MedicalCentre.deleteMany({});
  });

  describe('GET /medicalCentres', () => {
    test('should return empty array when no centres exist', async () => {
      const response = await request(app).get('/medicalCentres');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return all medical centres', async () => {
      await MedicalCentre.create(sampleMedicalCentre);

      const response = await request(app).get('/medicalCentres');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);
    });
  });

  describe('GET /medicalCentres/:id', () => {
    test('should return medical centre by id', async () => {
      const centre = await MedicalCentre.create(sampleMedicalCentre);

      const response = await request(app)
        .get(`/medicalCentres/${centre.id}`);

      expect(response.status).toBe(200);
      expect(response.body.medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);
    });

    test('should return 404 for non-existent id', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/medicalCentres/${fakeId}`);

      expect(response.status).toBe(404);
    });

    test('should return 500 for invalid id format', async () => {
      const response = await request(app)
        .get('/medicalCentres/invalid-id');

      expect(response.status).toBe(500);
    });
  });

  describe('POST /medicalCentres', () => {
    test('should create new medical centre', async () => {
      const response = await request(app)
        .post('/medicalCentres')
        .send(sampleMedicalCentre);

      expect(response.status).toBe(201);
      expect(response.body.medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);

      const centre = await MedicalCentre.findById(response.body.id);
      expect(centre).toBeTruthy();
    });

    test('should return 500 for invalid data', async () => {
      const invalidData = {
        medicalCentreName: 'Test Centre',
        // Missing required fields
      };

      const response = await request(app)
        .post('/medicalCentres')
        .send(invalidData);

      expect(response.status).toBe(500);
    });
  });

  describe('PATCH /medicalCentres/:id', () => {
    test('should update medical centre', async () => {
      const centre = await MedicalCentre.create(sampleMedicalCentre);
      const updateData = {
        medicalCentreName: 'Updated Centre Name',
        operatingHours: '8:00 AM - 6:00 PM',
      };

      const response = await request(app)
        .patch(`/medicalCentres/${centre.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.medicalCentreName).toBe(updateData.medicalCentreName);

      const updatedCentre = await MedicalCentre.findById(centre.id);
      expect(updatedCentre.medicalCentreName).toBe(updateData.medicalCentreName);
    });

    test('should return 404 for non-existent id', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .patch(`/medicalCentres/${fakeId}`)
        .send({ medicalCentreName: 'Updated Name' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /medicalCentres/:id', () => {
    test('should delete medical centre', async () => {
      const centre = await MedicalCentre.create(sampleMedicalCentre);

      const response = await request(app)
        .delete(`/medicalCentres/${centre.id}`);

      expect(response.status).toBe(200);

      const deletedCentre = await MedicalCentre.findById(centre.id);
      expect(deletedCentre).toBeNull();
    });

    test('should return 404 for non-existent id', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .delete(`/medicalCentres/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });
});
