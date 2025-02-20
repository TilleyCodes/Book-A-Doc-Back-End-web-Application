const express = require('express');

const patientRouter = express.Router();

const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

// GET ALL | http://localhost:3000/patients
patientRouter.get(
  '/',
  async (req, res) => {
    try {
      const patients = await getPatients();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// GET ONE | http://localhost:3000/patients/patientId
patientRouter.get(
  '/:patientId',
  async (req, res) => {
    const patient = await getPatient(req.params.patientId);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ error: `Patient with id: ${req.params.patientId} does not exist` });
    }
  },
);

// CREATE | http://localhost:3000/patients
patientRouter.post(
  '/',
  async (req, res) => {
    try {
      const newPatient = await createPatient(req.body);
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// UPDATE | http://localhost:3000/patients/patient_id
patientRouter.patch(
  '/:patientId',
  async (req, res) => {
    try {
      const { patientId } = req.params;
      const updatedPatient = await updatePatient(patientId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedPatient) {
        res.status(404).json({ error: `Patient with id: ${req.params.patientId} does not exist` });
      }
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// DELETE | http://localhost:3000/patients/patient_id
patientRouter.delete(
  '/:patientId',
  async (req, res) => {
    try {
      const deletedPatient = await deletePatient(req.params.patientId);

      if (!deletedPatient) {
        res.status(404).json({ error: `Patient with id: ${req.params.patientId} does not exist` });
      }
      res.status(200).json(deletedPatient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

module.exports = patientRouter;
