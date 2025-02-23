const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// Login function for patient auth
async function loginPatient(email, password) {
  // Identify patient with email
  const patient = await Patient.findOne({ email });
  if (!patient) {
    throw new Error('Invalid email or password');
  }

  // Compare password entered with patient password
  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
    throw new Error('Invalid email or password')
  }

  // Use schema to generate token or generate one directly
  const token = patient.generateAuthToken ? patient.generateAuthToken() : jwt.sign(
    { id: patient._id, email: patient.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1d' },
  );

  return { patient, token };
}

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  loginPatient,
};
