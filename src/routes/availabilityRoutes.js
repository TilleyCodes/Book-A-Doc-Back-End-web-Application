const express = require('express');
const {
  getAvailabilities,
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require('../controllers/availabilityController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const availabilityRouter = express.Router();

// Validation availability data middleware
const validateAvailabilityData = (req, res, next) => {
  const { date, startTime, endTime } = req.body;
  const errors = [];

  if (!date) {
    errors.push('Date is required');
  }
  if (!startTime?.trim()) {
    errors.push('Start time is required');
  }
  if (!endTime?.trim()) {
    errors.push('End time is required');
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

// GET ALL | http://localhost:3000/availability
availabilityRouter.get('/', errorHandler(async (req, res) => {
  const availabilities = await getAvailabilities();
  res.status(200).json(availabilities);
}));

// GET ONE | http://localhost:3000/availability/availablityId
availabilityRouter.get('/:availablityId', errorHandler(async (req, res) => {
  const availability = await getAvailability(req.params.availablityId);
  res.status(200).json(availability);
}));

// CREATE | http://localhost:3000/availability
availabilityRouter.post('/',auth, validateAvailabilityData, errorHandler(async (req, res) => {
  const newAvailability = await createAvailability(req.body);
  res.status(201).json(newAvailability);
}));

// UPDATE | http://localhost:3000/availability/patient_id
availabilityRouter.patch('/:availabilityId', auth, validateAvailabilityData, errorHandler(async (req, res) => {
  const updatedAvailability = await updateAvailability(req.params.availabilityId, req.body);
  res.status(200).json(updatedAvailability);
}));

// DELETE | http://localhost:3000/availability/patient_id
availabilityRouter.delete('/:availabilityId', auth, errorHandler(async (req, res) => {
  const deletedAvailability = await deleteAvailability(req.params.availabilityId);
  res.status(200).json(deletedAvailability);
}));

module.exports = availabilityRouter;
