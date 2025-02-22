/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../app');
const Patient = require('../models/patient');

const samplePatientData = [
  {
    _id: '67b6927a4644d8903cd58015',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '2000-01-01',
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

describe('Patients validation tests', () => {
  test('GET ALL | All patients should be over 18 years of age', async () => {
    Patient.find = jest.fn().mockResolvedValue(samplePatientData);

    // Make a GET request to /patients
    const response = await request(app).get('/patients');

    expect(response.status).toBe(200);

    // Loop through all objects and test if dateOfBirth is >= 18 years
    response.body.forEach((patient) => {
      const dob = new Date(patient.dateOfBirth);
      const diffMs = Date.now() - dob.getTime(); // Difference in milliseconds
      const ageDate = new Date(diffMs); // epoch start + diff = age in date form
      const age = Math.abs(ageDate.getUTCFullYear() - 1970); // years since 1970

      expect(age).toBeGreaterThanOrEqual(18);
    });
  });

  // Test for GET ONE route
  // Ensure only one object is returned
  test('GET ONE | should return only one object from sample of three and fname to be Liam', async () => {
    Patient.find = jest.fn().mockResolvedValue(samplePatientData);

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

// New data for POST and PATCH testing
const newPatientData = {
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
};

// Patient POST route testing
describe('Patient POST route testing', () => {
  test('POST | Should create a new patient object', async () => {
    Patient.create = jest.fn().mockResolvedValue(newPatientData);
    const res = await request(app).post('/patients');
    expect(res.status).toBe(200);
  });
});

// Patient PATCH route testing
describe('Patient PATCH route testing', () => {
  test('PATCH | Updated object should return lastName Doey and status code of 200', async () => {
    const updatedPatientData = {
      firstName: 'John',
      lastName: 'Doey',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01T00:00:00.000Z',
      address: {
        street: '123 Main St',
        city: 'Anytown',
      },
      phoneNumber: '0400 928 882',
      password: 'password123',
    };
    Patient.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPatientData);
    const res = await request(app).patch('/patients/:patientId');
    expect(res.body.lastName).toBe('Doey');
    expect(res.status).toBe(200);
  });

  test('PATCH | Expect 200 response after only one key value pair to be used in update.', async () => {
    const updatedSinglePatientData = {
      dateOfBirth: '1987-06-13',
    };
    Patient.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedSinglePatientData);
    const res = await request(app).patch('/patients/:patientId');
    expect(res.status).toBe(200);
    expect(res.body.dateOfBirth).toBe('1987-06-13');
  });
});
