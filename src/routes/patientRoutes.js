const express = require('express')
const PatientRouter = express.Router()

const {
    getPatients,
    getPatient,
    createPatient,
} = require('../controllers/patientController')

// GET ALL | http://localhost:3000/patients 
PatientRouter.get(
    '/',
    async (request, response) => {
        const patients = await getPatients()
        response.status(200).json(patients)
    }
)

// GET ONE | http://localhost:3000/patients/patientId
PatientRouter.get(
    '/:patientId',
    async (request, response) => {
        const patient = await getPatient(request.params.patientId)
        if (patient) {
            response.status(200).json(patient)
        } else {
            response.status(404).json({error: `Patient with id: ${request.params.patientId} does not exist`})
        }
    }
)

// CREATE | http://localhost:3000/patients
PatientRouter.post(
    '/',
    async (request, response) => {
        const bodyData = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            dateOfBirth: request.body.dateOfBirth,
            address: {
                street: request.body.address.street, 
                city: request.body.address.city
            },
            phoneNumber: request.body.phoneNumber,
            password: request.body.password
        }
        const newPatient = await createPatient(bodyData)
        response.status(201).json(newPatient)
    }
)

// UPDATE | http://localhost:3000/patients/patient_id


// DELETE | http://ocalhost:3000/patients/patient_id


module.exports = {
    PatientRouter
}