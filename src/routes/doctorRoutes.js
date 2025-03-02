const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const doctorRouter = express.Router();

// Validation middleware
const validateDoctorData = (req, res, next) => {
  const { doctorName, specialtyId } = req.body;
  const errors = [];

  if (!doctorName?.trim()) {
    errors.push('Doctor name is required');
  }
  if (!specialtyId) {
    errors.push('Specialty ID is required');
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

// GET all doctors - http://localhost:3000/doctors
doctorRouter.get('/', errorHandler(async (req, res) => {
  const doctors = await getDoctors();
  res.status(200).json(doctors);
}));

// GET a single doctor - http://localhost:3000/doctors/_id
doctorRouter.get('/:doctorId', errorHandler(async (req, res) => {
  const doctor = await getDoctor(req.params.doctorId);
  res.status(200).json(doctor);
}));

// CREATE new doctor - http://localhost:3000/doctors
doctorRouter.post('/', validateDoctorData, errorHandler(async (req, res) => {
  const bodyData = {
    doctorName: req.body.doctorName,
    specialtyId: req.body.specialtyId,
  };
  const newDoctor = await createDoctor(bodyData);
  res.status(201).json(newDoctor);
}));

// PATCH update doctor - http://localhost:3000/doctors/_id
doctorRouter.patch('/:doctorId', auth, validateDoctorData, errorHandler(async (req, res) => {
  const bodyData = {
    doctorName: req.body.doctorName,
    specialtyId: req.body.specialtyId,
  };
  const updatedDoctor = await updateDoctor(req.params.doctorId, bodyData);
  res.status(200).json(updatedDoctor);
}));

// DELETE doctor - http://localhost:3000/doctors/_id
doctorRouter.delete('/:doctorId', auth, errorHandler(async (req, res) => {
  const deletedDoctor = await deleteDoctor(req.params.doctorId);
  res.status(200).json(deletedDoctor);
}));

module.exports = doctorRouter;
