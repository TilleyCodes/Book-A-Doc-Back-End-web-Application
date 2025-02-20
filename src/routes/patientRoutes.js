const express = require('express')
const PatientRouter = express.Router()

const {
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
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
        try {
            const newPatient = await createPatient(request.body)
            response.status(201).json(newPatient)
        } catch (error) {
            response.status(500).json({error: error.message})
        }
    }
)

// UPDATE | http://localhost:3000/patients/patient_id
PatientRouter.patch(
    '/:patientId',
    async (request, response) => {
        try {
            const patientId = request.params.patientId
            const updatedPatient = await updatePatient(patientId, request.body, {
                new: true,
                runValidators: true
            })
            if (!updatedPatient) {
                response.status(404).json({error: `Patient with id: ${request.params.patientId} does not exist`})
                console.log('404')
            } 
            response.status(200).json(updatedPatient) 
        } catch (error) {
            response.status(500).json({error: error.message})
        }
    }
)

// DELETE | http://ocalhost:3000/patients/patient_id
PatientRouter.delete(
    '/:patientId',
    async (request, response) => {
        try {
            const deletedPatient = await deletePatient(request.params.patientId)

            if (!deletedPatient) {
                response.status(404).json({error: `Patient with id: ${request.params.patientId} does not exist`})
                console.log('404')
            }
            response.status(200).json(updatedPatient) 
        } catch (error) {
            response.status(500).json({error: error.message})
        }
    }
)

module.exports = {
    PatientRouter
}