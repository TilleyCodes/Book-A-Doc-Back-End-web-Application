const Patient = require('../models/patient');

// GET ALL data from PatientsModel db
async function getPatients() {
  const patients = await Patient.find();
  return patients;
}

// GET ONE data from PatientsModel db
async function getPatient(id) {
  const patient = await Patient.findById(id);
  return patient;
}

// CREATE data from PatientsModel db
async function createPatient(data) {
  const newPatient = await Patient.create(data);
  const token = newPatient.generateAuthToken();
  return { newPatient, token };
}

// UPDATE data from PatientsModel db
async function updatePatient(id, data, options = {}) {
  const updatedPatient = await Patient.findByIdAndUpdate(
    id,
    { $set: data }, // Allows partial update
    options,
  );
  return updatedPatient;
}

// DELETE data from PatientsModel db
async function deletePatient(id) {
  const deletedPatient = await Patient.findByIdAndDelete(id);
  return deletedPatient;
}

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
