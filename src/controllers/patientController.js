const Patient = require("../models/patient");

// GET ALL data from PatientsModel db
async function getPatients() {
    const patients = await Patient.find()
    return patients
}

// GET ONE data from PatientsModel db
async function getPatient(patientId) {
    const patient = await Patient.findById(patientId)
    return patient
}

// CREATE data from PatientsModel db


// UPDATE data from PatientsModel db


// DELETE data from PatientsModel db


module.exports = {
    getPatients,
    getPatient,
}