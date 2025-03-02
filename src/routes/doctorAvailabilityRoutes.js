const express = require('express');
const {
  getDoctorAvailabilities,
  getDoctorAvailability,
  createDoctorAvailability,
  updateDoctorAvailability,
  deleteDoctorAvailability,
} = require('../controllers/doctorAvailabilityController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const doctorAvailabilityRouter = express.Router();

// Validate doctor availabilty data middleware
const validateDoctorAvailabilityData = (req, res, next) => {
  const { doctorId, availabilityId } = req.body;
  const errors = [];

  if (!doctorId) {
    errors.push('Doctor ID is required');
  }
  if (!availabilityId) {
    errors.push('Availability ID is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors,
    });
  }
  return next();
};

// GET ALL | http://localhost:3000/doctor_availability
doctorAvailabilityRouter.get('/', errorHandler(async (req, res) => {
  const doctorAvailabilities = await getDoctorAvailabilities();
  res.status(200).json(doctorAvailabilities);
}));

// GET ONE | http://localhost:3000/doctor_availability/doctorAvailId
doctorAvailabilityRouter.get('/:doctorAvailabilityId', errorHandler(async (req, res) => {
  const doctorAvailability = await getDoctorAvailability(req.params.doctorAvailabilityId);
  res.status(200).json(doctorAvailability);
}));

// CREATE | http://localhost:3000/doctor_availability
doctorAvailabilityRouter.post('/', auth, validateDoctorAvailabilityData, errorHandler(async (req, res) => {
  const newDoctorAvailability = await createDoctorAvailability(req.body);
  res.status(201).json(newDoctorAvailability);
}));

// UPDATE | http://localhost:3000/doctor_availability/doctorAvailId
doctorAvailabilityRouter.patch('/:doctorAvailabilityId', auth, validateDoctorAvailabilityData, errorHandler(async (req, res) => {
  const updatedDoctorAvailability = await updateDoctorAvailability(
    req.params.doctorAvailabilityId,
    req.body,
  );
  res.status(200).json(updatedDoctorAvailability);
}));

// DELETE | http://localhost:3000/doctor_availability/doctorAvailId
doctorAvailabilityRouter.delete('/:doctorAvailabilityId', auth, errorHandler(async (req, res) => {
  const deletedDoctorAvailability = await deleteDoctorAvailability(req.params.doctorAvailabilityId);
  res.status(200).json(deletedDoctorAvailability);
}));

module.exports = doctorAvailabilityRouter;
