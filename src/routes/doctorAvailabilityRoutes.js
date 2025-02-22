const express = require('express');

const doctorAvailabilityRouter = express.Router();

const {
  getDoctorAvailabilities,
  getDoctorAvailability,
  createDoctorAvailability,
  updateDoctorAvailability,
  deleteDoctorAvailability,
} = require('../controllers/doctorAvailabilityController');

const errorHandler = require('../middleware/errorHandler');

// GET ALL | http://localhost:3000/doctor_availability
doctorAvailabilityRouter.get('/', errorHandler(async (req, res) => {
  const drAvailabilities = await getDoctorAvailabilities();
  res.status(200).json(drAvailabilities);
}));

// GET ONE | http://localhost:3000/doctor_availability/drAvailId
doctorAvailabilityRouter.get('/:drAvailId', errorHandler(async (req, res) => {
  const drAvailability = await getDoctorAvailability(req.params.drAvailId);
  if (!drAvailability) {
    res.status(404).json({ error: `Doctor availability with id: ${req.params.drAvailId} does not exist` });
  }
  res.status(200).json(drAvailability);
}));

// CREATE | http://localhost:3000/doctor_availability
doctorAvailabilityRouter.post('/', errorHandler(async (req, res) => {
  const newDoctorAvailability = await createDoctorAvailability(req.body);
  res.status(201).json(newDoctorAvailability);
}));

// UPDATE | http://localhost:3000/doctor_availability/drAvailId
doctorAvailabilityRouter.patch('/:drAvailId', async (req, res) => {
  const { drAvailId } = req.params;
  const updatedDoctorAvailability = await updateDoctorAvailability(drAvailId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedDoctorAvailability) {
    res.status(404).json({ error: `Doctor availability with id: ${req.params.drAvailId} does not exist` });
  }
  res.status(200).json(updatedDoctorAvailability);
});

// DELETE | http://localhost:3000/doctor_availability/drAvailId
doctorAvailabilityRouter.delete('/:drAvailId', async (req, res) => {
  const deletedDoctorAvailability = await deleteDoctorAvailability(req.params.drAvailId);
  if (!deletedDoctorAvailability) {
    res.status(404).json({ error: `Doctor availability with id: ${req.params.drAvailId} does not exist` });
  }
  res.status(200).json(deletedDoctorAvailability);
});

module.exports = doctorAvailabilityRouter;
