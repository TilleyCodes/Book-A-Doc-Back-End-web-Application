const express = require('express');

const availabilityRouter = express.Router();

const {
  getAvailabilities,
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require('../controllers/availabilityController');

const errorHandler = require('../middleware/errorHandler');

// GET ALL | http://localhost:3000/availability
availabilityRouter.get('/', errorHandler(async (req, res) => {
  const availabilities = await getAvailabilities();
  res.status(200).json(availabilities);
}));

// GET ONE | http://localhost:3000/availability/availablityId
availabilityRouter.get('/:availablityId', errorHandler(async (req, res) => {
  const patient = await getAvailability(req.params.availablityId);
  if (!patient) {
    res.status(404).json({ error: `Availability with id: ${req.params.availablityId} does not exist` });
  }
  res.status(200).json(patient);
}));

// CREATE | http://localhost:3000/availability
availabilityRouter.post('/', errorHandler(async (req, res) => {
  const newAvailability = await createAvailability(req.body);
  res.status(201).json(newAvailability);
}));

// UPDATE | http://localhost:3000/availability/patient_id
availabilityRouter.patch('/:availablityId', errorHandler(async (req, res) => {
  const { availablityId } = req.params;
  const updatedAvailability = await updateAvailability(availablityId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedAvailability) {
    res.status(404).json({ error: `Availability with id: ${req.params.availablityId} does not exist` });
  }
  res.status(200).json(updatedAvailability);
}));

// DELETE | http://localhost:3000/availability/patient_id
availabilityRouter.delete('/:availablityId', errorHandler(async (req, res) => {
  const deletedAvailability = await deleteAvailability(req.params.availablityId);
  if (!deletedAvailability) {
    res.status(404).json({ error: `Availability with id: ${req.params.availablityId} does not exist` });
  }
  res.status(200).json(deletedAvailability);
}));

module.exports = availabilityRouter;
