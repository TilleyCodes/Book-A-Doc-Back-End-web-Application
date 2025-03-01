const express = require('express');
const {
  getDoctorCentres,
  getDoctorCentre,
  createDoctorCentre,
  updateDoctorCentre,
  deleteDoctorCentre,
} = require('../controllers/doctorCentreController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const doctorCentreRouter = express.Router();

// Validation middleware
const validateDoctorCentreData = (req, res, next) => {
  const { doctorId, medicalCentreId } = req.body;
  const errors = [];

  if (!doctorId) {
    errors.push('Doctor ID is required');
  }
  if (!medicalCentreId) {
    errors.push('Medical Centre ID is required');
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

// GET all doctor centres - http://localhost:3000/doctorCentres
doctorCentreRouter.get('/', errorHandler(async (req, res) => {
  const doctorCentres = await getDoctorCentres();
  res.status(200).json(doctorCentres);
}));

// GET a single doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.get('/:doctorCentreId', errorHandler(async (req, res) => {
  const doctorCentre = await getDoctorCentre(req.params.doctorCentreId);
  res.status(200).json(doctorCentre);
}));

// CREATE new doctor centre - http://localhost:3000/doctorCentres
doctorCentreRouter.post('/', auth, validateDoctorCentreData, errorHandler(async (req, res) => {
  const bodyData = {
    doctorId: req.body.doctorId,
    medicalCentreId: req.body.medicalCentreId,
  };
  const newDoctorCentre = await createDoctorCentre(bodyData);
  res.status(201).json(newDoctorCentre);
}));

// PATCH update doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.patch('/:doctorCentreId', auth, validateDoctorCentreData, errorHandler(async (req, res) => {
  const bodyData = {
    doctorId: req.body.doctorId,
    medicalCentreId: req.body.medicalCentreId,
  };
  const updatedDoctorCentre = await updateDoctorCentre(req.params.doctorCentreId, bodyData);
  res.status(200).json(updatedDoctorCentre);
}));

// DELETE doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.delete('/:doctorCentreId', auth, errorHandler(async (req, res) => {
  const deletedDoctorCentre = await deleteDoctorCentre(req.params.doctorCentreId);
  res.status(200).json(deletedDoctorCentre);
}));

module.exports = doctorCentreRouter;
