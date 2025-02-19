const express = require('express')
const PatientsRouter = express.Router()

const {
    getPatients,
    getPatient,
} = require('../controllers/patientsController')

// GET ALL | http://localhost:3000/patients 
PatientsRouter.get(
    '/',
    async (request, response) => {
        const patients = await getPatients()
        response.status(200).json(patients)
    }
)

// GET ONE | http://localhost:3000/patients/patientId
PatientsRouter.get(
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


// UPDATE | http://localhost:3000/patients/patient_id


// DELETE | http://ocalhost:3000/patients/patient_id


module.exports = {
    PatientsRouter
}