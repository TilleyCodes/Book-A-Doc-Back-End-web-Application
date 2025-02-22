const express = require('express');

const patientRouter = express.Router();

const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

const errorHandler = require('../middleware/errorHandler');

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

module.exports = patientRouter;
