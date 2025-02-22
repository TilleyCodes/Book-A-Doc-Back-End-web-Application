const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');

const errorHandler = require('../middleware/errorHandler');

const doctorRouter = express.Router();

// GET all doctors - http://localhost:3000/doctors
doctorRouter.get('/', errorHandler(async (req, res) => {
  const doctors = await getDoctors();
  res.status(200).json(doctors);
}));

// GET a single doctor - http://localhost:3000/doctors/_id
doctorRouter.get('/:doctorId', errorHandler(async (req, res) => {
  const doctor = await getDoctor(req.params.doctorId);
  if (!doctor) {
    res.status(404).json({ error: `Doctor with id ${req.params.doctorId} not found` });
  }
  res.status(200).json(doctor);
}));

// CREATE new doctor - http://localhost:3000/doctors
doctorRouter.post('/', errorHandler(async (req, res) => {
  const bodyData = {
    doctorName: req.body.doctorName,
    specialtyId: req.body.specialtyId,
  };
  const newDoctor = await createDoctor(bodyData);
  res.status(201).json(newDoctor);
}));

// PATCH update doctor - http://localhost:3000/doctors/_id
doctorRouter.patch('/:doctorId', errorHandler(async (req, res) => {
  const bodyData = {
    doctorName: req.body.doctorName,
    specialtyId: req.body.specialtyId,
  };
  const updatedDoctor = await updateDoctor(req.params.doctorId, bodyData);
  if (!updatedDoctor) {
    res.status(404).json({ error: `Doctor with id ${req.params.doctorId} not found` });
  } else if (updatedDoctor.error) {
    res.status(403).json(updatedDoctor);
  } else {
    res.status(200).json(updatedDoctor);
  }
}));

// DELETE doctor - http://localhost:3000/doctors/_id
doctorRouter.delete('/:doctorId', errorHandler(async (req, res) => {
  const deletedDoctor = await deleteDoctor(req.params.doctorId);
  if (!deletedDoctor) {
    res.status(404).json({ error: `Doctor with id ${req.params.doctorId} not found` });
  }
  res.status(200).json(deletedDoctor);
}));

module.exports = doctorRouter;
