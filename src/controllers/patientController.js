const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');

// GET ALL data from PatientsModel db
async function getPatients() {
  const patients = await Patient.find().sort({ lastName: 1, firstName: 1 });
  return patients;
}

// GET ONE Patient by ID
async function getPatient(id) {
  const patient = await Patient.findById(id);
  if (!patient) {
    const error = new Error(`Patient with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return patient;
}

// CREATE data from PatientsModel db
async function createPatient(data) {
  try {
    const newPatient = await Patient.create(data);
    const token = newPatient.generateAuthToken();
    return { newPatient, token };
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    } else if (error.code === 11000) {
      error.status = 409;
    }
    throw error;
  }
}

// UPDATE data from PatientsModel db
async function updatePatient(id, data) {
  const updatedPatient = await Patient.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true },
  );

  if (!updatedPatient) {
    const error = new Error(`Patient with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedPatient;
}

// DELETE data from PatientsModel db
async function deletePatient(id) {
  const deletedPatient = await Patient.findByIdAndDelete(id);

  if (!deletedPatient) {
    const error = new Error(`Patient with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedPatient;
}

// Login function for patient auth
async function loginPatient(email, password) {
  // Find patient with email
  const patient = await Patient.findOne({ email });
  if (!patient) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Compare password entered with patient password
  const isMatch = await patient.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // generate token
  const token = patient.generateAuthToken();

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
