const request = require('supertest')
const app = require('../app')
const { PatientsModel } = require('../models/patientModels')

describe('GET /patients', () => {
  test('should return a patient with _id length of 24', async () => {
    // Arrange: mock PatientsModel.find
    const samplePatients = [
        {
            "_id": "67b41bf2a21d5bb7a7a0bb0f",
            "fname": "John",
            "lname": "Doe",
            "email": "john.doe@example.com",
            "date_of_birth": "1990-01-01T00:00:00.000Z",
            "address": "123 Main St, Anytown, Australia",
            "phone_number": "0400 928 882",
            "password": "password123",
            "__v": 0
          }
    ]
    PatientsModel.find = jest.fn().mockResolvedValue(samplePatients);

    // Act: make a GET request to /patients
    const response = await request(app).get('/patients')

    // Assert: check that the first patient's _id is 24 characters long
    expect(response.status).toBe(200)
    expect(response.body[0]._id).toHaveLength(24)
    expect(PatientsModel.find).toHaveBeenCalledTimes(1)
  })
})