const request = require('supertest');
const app = require('../app');
const Specialty = require('../models/specialty');

const sampleSpecialtyData = [
  {
    _id: '67b6927a4644d8903cd58015',
    specialtyName: "GP Women's Health",
    description: "Specialised care in women's health including reproductive health, pregnancy care, and menopause management.",
    __v: 0,
  },
  {
    _id: '67b6927a4644d8903cd58016',
    specialtyName: "GP Men's Health",
    description: 'Focused on male-specific health issues including prostate health and testosterone management.',
    __v: 0,
  },
  {
    _id: '67b6927a4644d8903cd58017',
    specialtyName: 'GP Skin Checks',
    description: 'Comprehensive skin examinations and early detection of skin cancers.',
    __v: 0,
  },
];

describe('Specialty Routes testing', () => {
  test('GET ALL | should return all specialties', async () => {
    Specialty.find = jest.fn().mockResolvedValue(sampleSpecialtyData);

    const response = await request(app).get('/specialties');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(Specialty.find).toHaveBeenCalledTimes(1);
  });

  test('GET ALL | should return empty array with a 200 status', async () => {
    const emptyArray = [];
    Specialty.find = jest.fn().mockResolvedValue(emptyArray);

    const response = await request(app).get('/specialties');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('GET ONE | should return one specialty by id', async () => {
    Specialty.findById = jest.fn().mockResolvedValue(sampleSpecialtyData[0]);

    const response = await request(app)
      .get('/specialties/67b6927a4644d8903cd58015');

    expect(response.status).toBe(200);
    expect(response.body.specialtyName).toBe("GP Women's Health");
  });

  test('GET ONE | should return 404 for non-existent id', async () => {
    Specialty.findById = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .get('/specialties/67b6927a4644d8903cd58999');

    expect(response.status).toBe(404);
  });

  test('POST | should create a new specialty', async () => {
    const newSpecialty = {
      specialtyName: 'GP Travel Medicine',
      description: 'Provides travel vaccinations and health advice for international travelers.',
    };

    Specialty.create = jest.fn().mockResolvedValue({
      _id: '67b6927a4644d8903cd58020',
      ...newSpecialty,
    });

    const response = await request(app)
      .post('/specialties')
      .send(newSpecialty);

    expect(response.status).toBe(201);
    expect(response.body.specialtyName).toBe(newSpecialty.specialtyName);
  });

  test('PATCH | should update a specialty', async () => {
    const updateData = {
      specialtyName: 'Updated Specialty Name',
      description: 'Updated description',
    };

    Specialty.findByIdAndUpdate = jest.fn().mockResolvedValue({
      _id: '67b6927a4644d8903cd58015',
      ...updateData,
    });

    const response = await request(app)
      .patch('/specialties/67b6927a4644d8903cd58015')
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.specialtyName).toBe(updateData.specialtyName);
  });

  test('PATCH | should return 404 for non-existent specialty', async () => {
    Specialty.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .patch('/specialties/67b6927a4644d8903cd58999')
      .send({ specialtyName: 'Test Update' });

    expect(response.status).toBe(404);
  });

  test('DELETE | should delete a specialty', async () => {
    Specialty.findByIdAndDelete = jest.fn().mockResolvedValue(sampleSpecialtyData[0]);

    const response = await request(app)
      .delete('/specialties/67b6927a4644d8903cd58015');

    expect(response.status).toBe(200);
    expect(response.body.specialtyName).toBe(sampleSpecialtyData[0].specialtyName);
  });

  test('DELETE | should return 404 for non-existent specialty', async () => {
    Specialty.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .delete('/specialties/67b6927a4644d8903cd58999');

    expect(response.status).toBe(404);
  });
});
