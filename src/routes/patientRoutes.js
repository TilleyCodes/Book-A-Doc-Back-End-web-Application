const express = require('express');
const auth = require('../middleware/authMiddleware');
const Patient = require('../models/patient');

const patientRouter = express.Router();

const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  loginPatient,
} = require('../controllers/patientController');

const errorHandler = require('../middleware/errorHandler');

// PROFILE route that's protected by auth
patientRouter.get('/profile', auth, errorHandler(async (req, res) => {
    // get req.patient which contains decoded token data from auth middleware
    const patient = await Patient.findById(req.patient.id);
    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }
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
  if (!patient) {
    res.status(404).json({ error: `Patient with id: ${req.params.patientId} does not exist` });
  }
  res.status(200).json(patient);
}));

// CREATE | http://localhost:3000/patients
patientRouter.post('/', errorHandler(async (req, res) => {
  const result = await createPatient(req.body);
  res.status(201).json(result);
}));

// UPDATE | http://localhost:3000/patients/patient_id
patientRouter.patch('/:patientId', errorHandler(async (req, res) => {
  const { patientId } = req.params;
  const updatedPatient = await updatePatient(patientId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedPatient) {
    res.status(404).json({ error: `Patient with id: ${req.params.patientId} does not exist` });
  }
  res.status(200).json(updatedPatient);
}));

// DELETE | http://localhost:3000/patients/patient_id
patientRouter.delete('/:patientId', errorHandler(async (req, res) => {
  const deletedPatient = await deletePatient(req.params.patientId);
  if (!deletedPatient) {
    res.status(404).json({ error: `Patient with id: ${req.params.patientId} does not exist` });
  }
  res.status(200).json(deletedPatient);
}));

// LOGIN route for patients | http://localhost:3000/patients
patientRouter.post('/login', errorHandler(async (req, res) => {
    const { email, password } = req.body;
    const { patient, token } = await loginPatient(email, password);
    res.status(200).json({ patient, token });
}));

module.exports = patientRouter;
