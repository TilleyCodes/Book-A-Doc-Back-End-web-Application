const request = require('supertest')
const app = require('../app')
const { PatientsModel } = require('../models/patientModels')

describe('Patients route testing', () => {
  test('GET ALL | should return a patient with _id length of 24', async () => {
    // Mock PatientsModel.find
    const samplePatient = [
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
    PatientsModel.find = jest.fn().mockResolvedValue(samplePatient)

    // Make a GET request to /patients
    const response = await request(app).get('/patients')

    // Check that the first patient's _id is 24 characters long
    expect(response.status).toBe(200)
    expect(response.body[0]._id).toHaveLength(24)
    expect(PatientsModel.find).toHaveBeenCalledTimes(1)
  })

  // Test for GET ONE route
  // Ensure only one object is returned
  test('GET ONE | should return only one object from sample of three and fname to be Liam', async () => {
    const samplePatients = [
      {
        "_id": "67b41bf2a21d5bb7a7a0bb10",
        "fname": "Jane",
        "lname": "Smith",
        "email": "jane.smith@example.com",
        "date_of_birth": "1985-05-15T00:00:00.000Z",
        "address": "456 Elm St, Othertown, Australia",
        "phone_number": "0433 393 203",
        "password": "password456",
        "__v": 0
      },
      {
        "_id": "67b41bf2a21d5bb7a7a0bb11",
        "fname": "Emily",
        "lname": "Johnson",
        "email": "emily.johnson@example.com",
        "date_of_birth": "1988-07-22T00:00:00.000Z",
        "address": "789 George St, Sydney, NSW 2000",
        "phone_number": "0412 345 678",
        "password": "emily123",
        "__v": 0
      },
      {
        "_id": "67b41bf2a21d5bb7a7a0bb12",
        "fname": "Liam",
        "lname": "Brown",
        "email": "liam.brown@example.com",
        "date_of_birth": "1995-03-14T00:00:00.000Z",
        "address": "456 Collins St, Melbourne, VIC 3000",
        "phone_number": "0401 234 567",
        "password": "liam456",
        "__v": 0
      }
    ]
    PatientsModel.find = jest.fn().mockResolvedValue(samplePatients)

    // Make a GET request to /patients/:patientId
    const response = await request(app).get('/patients/67b41bf2a21d5bb7a7a0bb12')

    // Check for 200 response
    // Check for only 1 object
    // Check patients fname is Liam
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].fname).toBe('Liam')
  })

})