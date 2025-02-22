const request = require('supertest');
const app = require('../app');
const MedicalCentre = require('../models/medicalCentre');

const sampleMedicalCentre = {
  _id: '67b86605a0b4c9a781ce2086',
  medicalCentreName: 'World Square Medical Centre',
  operatingHours: '8am - 6pm',
  address: {
    street: '1 Victoria Road',
    city: 'Melbourne',
  },
  contacts: {
    email: 'worldsquaremc@email.com',
    phone: '+61 39735 8466',
  },
  __v: 0,
};

describe('Medical Centre Routes testing', () => {
  test('GET ALL | should return empty array when no centres exist', async () => {
    MedicalCentre.find = jest.fn().mockResolvedValue([]);

    const response = await request(app).get('/medicalCentres');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(MedicalCentre.find).toHaveBeenCalledTimes(1);
  });

  test('GET ALL | should return all medical centres', async () => {
    const mockCentres = [sampleMedicalCentre];
    MedicalCentre.find = jest.fn().mockResolvedValue(mockCentres);

    const response = await request(app).get('/medicalCentres');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);
  });

  test('GET ONE | should return medical centre by id', async () => {
    MedicalCentre.findById = jest.fn().mockResolvedValue(sampleMedicalCentre);

    const response = await request(app)
      .get('/medicalCentres/65b6927a4644d8903cd58015');

    expect(response.status).toBe(200);
    expect(response.body.medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);
  });

  test('GET ONE | should return 404 for non-existent id', async () => {
    MedicalCentre.findById = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .get('/medicalCentres/65b6927a4644d8903cd58015');

    expect(response.status).toBe(404);
  });

  test('POST | should create new medical centre', async () => {
    MedicalCentre.create = jest.fn().mockResolvedValue(sampleMedicalCentre);

    const response = await request(app)
      .post('/medicalCentres')
      .send(sampleMedicalCentre);

    expect(response.status).toBe(201);
    expect(response.body.medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);
  });

  test('PATCH | should update medical centre', async () => {
    const updatedCentre = {
      ...sampleMedicalCentre,
      medicalCentreName: 'Updated Centre Name',
    };

    MedicalCentre.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedCentre);

    const response = await request(app)
      .patch('/medicalCentres/65b6927a4644d8903cd58015')
      .send({ medicalCentreName: 'Updated Centre Name' });

    expect(response.status).toBe(200);
    expect(response.body.medicalCentreName).toBe('Updated Centre Name');
  });

  test('DELETE | should delete medical centre', async () => {
    MedicalCentre.findByIdAndDelete = jest.fn().mockResolvedValue(sampleMedicalCentre);

    const response = await request(app)
      .delete('/medicalCentres/65b6927a4644d8903cd58015');

    expect(response.status).toBe(200);
    expect(response.body.medicalCentreName).toBe(sampleMedicalCentre.medicalCentreName);
  });
});
