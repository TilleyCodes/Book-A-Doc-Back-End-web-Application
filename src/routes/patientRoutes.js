const express = require('express');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  loginPatient,
} = require('../controllers/patientController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const patientRouter = express.Router();

// Validation middleware
const validatePatientData = (req, res, next) => {
  const { 
    firstName, lastName, email, dateOfBirth, 
    address, phoneNumber, password 
  } = req.body;
  const errors = [];

  if (!firstName?.trim()) {
    errors.push('First name is required');
  }
  if (!lastName?.trim()) {
    errors.push('Last name is required');
  }
  if (!email?.trim()) {
    errors.push('Email is required');
  }
  if (!dateOfBirth) {
    errors.push('Date of birth is required');
  }
  if (!address?.street?.trim() || !address?.city?.trim()) {
    errors.push('Complete address is required');
  }
  if (!phoneNumber?.trim()) {
    errors.push('Phone number is required');
  }
  if (password && password.length < 10) {
    errors.push('Password must be at least 10 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      status: 'error',
      message: 'Validation failed',
      errors 
    });
  }
  return next();
};

// PROFILE route that's protected by auth
patientRouter.get('/profile', auth, errorHandler(async (req, res) => {
  const patient = await getPatient(req.patient.id);
  res.status(200).json(patient);
}));

// GET ALL | http://localhost:3000/patients
patientRouter.get('/', errorHandler(async (req, res) => {
  const patients = await getPatients();
  res.status(200).json(patients);
}));

// GET ONE | http://localhost:3000/patients/patientId
patientRouter.get('/:patientId', errorHandler(async (req, res) => {
  const patient = await getPatient(req.params.patientId);
  res.status(200).json(patient);
}));

// CREATE | http://localhost:3000/patients
patientRouter.post('/', validatePatientData, errorHandler(async (req, res) => {
  const result = await createPatient(req.body);
  res.status(201).json(result);
}));

// UPDATE | http://localhost:3000/patients/patient_id
patientRouter.patch('/:patientId', auth, validatePatientData, errorHandler(async (req, res) => {
  const updatedPatient = await updatePatient(req.params.patientId, req.body);
  res.status(200).json(updatedPatient);
}));

// DELETE | http://localhost:3000/patients/patient_id
patientRouter.delete('/:patientId', auth, errorHandler(async (req, res) => {
  const deletedPatient = await deletePatient(req.params.patientId);
  res.status(200).json(deletedPatient);
}));

// LOGIN route for patients | http://localhost:3000/patients
patientRouter.post('/login', errorHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required'
    });
  }
  
  const { patient, token } = await loginPatient(email, password);
  return res.status(200).json({
    status: 'success',
    patient,
    token
  });
}));

module.exports = patientRouter;
