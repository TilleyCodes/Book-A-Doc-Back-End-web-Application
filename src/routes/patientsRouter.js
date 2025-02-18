const express = require('express')
const PatientsRouter = express.Router()

const {
    getPatients,
} = require('../controllers/patientsController')

// GET ALL | http://localhost:3000/patients 
PatientsRouter.get(
    '/',
    async (request, response) => {
        const patients = await getPatients()
        response.status(200).json(patients)
    }
)

// GET ONE | http://localhost:3000/patients/patient_id


// CREATE | http://localhost:3000/patients


// UPDATE | http://localhost:3000/patients/patient_id


// DELETE | http://ocalhost:3000/patients/patient_id


module.exports = {
    PatientsRouter,
}