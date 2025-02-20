const Patient = require('../models/patient')

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
async function createPatient(data) {
    const newPatient = await Patient.create(data)
    return newPatient
}

// UPDATE data from PatientsModel db
async function updatePatient(patientId, data, options = {}) {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, 
        { $set: data}, // Allows partial update
        options
    )
    return updatedPatient
}

// DELETE data from PatientsModel db
async function deletePatient(patientId) {
    const deletedPatient = await Patient.findByIdAndDelete(patientId)
    return deletedPatient
}


module.exports = {
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient
}