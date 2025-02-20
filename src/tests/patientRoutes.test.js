const request = require('supertest');
const app = require('../app');
const Patient = require('../models/patient');

const goodSamplePatientData = [
  {
    _id: '67b6927a4644d8903cd58015',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01T00:00:00.000Z',
    address: {
      street: '123 Main St',
      city: 'Anytown',
    },
    phoneNumber: '0400 928 882',
    password: 'password123',
    __v: 0,
  },
  {
    _id: '67b6927a4644d8903cd58016',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    dateOfBirth: '1985-07-15T00:00:00.000Z',
    address: {
      street: '456 High St',
      city: 'Sampletown',
    },
    phoneNumber: '0400 345 678',
    password: 'mypassword789',
    __v: 0,
  },
  {
    _id: '67b6927a4644d8903cd58017',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    dateOfBirth: '1988-11-20T00:00:00.000Z',
    address: {
      street: '789 Pine Rd',
      city: 'Exampleville',
    },
    phoneNumber: '0400 888 999',
    password: 'securepass567',
    __v: 0,
  },
  {
    _id: '67b6927a4644d8903cd58018',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    dateOfBirth: '1975-04-10T00:00:00.000Z',
    address: {
      street: '42 Elm St',
      city: 'Anothercity',
    },
    phoneNumber: '0400 111 222',
    password: 'longpassword999',
    __v: 0,
  },
];

describe('Patients route golden path', () => {
  test('GET ALL | should return a patient with _id length of 24', async () => {
    Patient.find = jest.fn().mockResolvedValue(goodSamplePatientData);

    // Make a GET request to /patients
    const response = await request(app).get('/patients');

    // Check that the first patient's _id is 24 characters long
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body[0]._id).toHaveLength(24);
    expect(Patient.find).toHaveBeenCalledTimes(1);
  });

  // Test for GET ONE route
  // Ensure only one object is returned
  test('GET ONE | should return only one object from sample of three and fname to be Liam', async () => {
    Patient.find = jest.fn().mockResolvedValue(goodSamplePatientData);

    // Make a GET request to /patients/:patientId
    const response = await request(app).get('/patients/67b6927a4644d8903cd58016');

    // Check for 200 response
    // Check for only 1 object
    // Check patients fname is Jane
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].firstName).toBe('Jane');
  });

  // Check for empty result
  test('GET | Should return an empty array with a 200 status', async () => {
    const emptyArray = [];
    Patient.find = jest.fn().mockResolvedValue(emptyArray);
    const response = await request(app).get('/patients');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

// describe('Patient route nasty path', () => {
//   test('CREATE | Throw error')
// })
