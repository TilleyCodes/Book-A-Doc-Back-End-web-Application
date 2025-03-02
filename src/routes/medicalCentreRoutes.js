const express = require('express');
const {
  getMedicalCentres,
  getMedicalCentre,
  createMedicalCentre,
  updateMedicalCentre,
  deleteMedicalCentre,
} = require('../controllers/medicalCentreController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const medicalCentreRouter = express.Router();

// Validation middleware
const validateMedicalCentreData = (req, res, next) => {
  const {
    medicalCentreName,
    operatingHours,
    address,
    contacts,
  } = req.body;
  const errors = [];

  if (!medicalCentreName?.trim()) {
    errors.push('Medical centre name is required');
  }
  if (!operatingHours?.trim()) {
    errors.push('Operating hours are required');
  }
  if (!address?.street?.trim() || !address?.city?.trim()) {
    errors.push('Complete address is required');
  }
  if (!contacts?.email?.trim() || !contacts?.phone?.trim()) {
    errors.push('Complete contact details are required');
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

// Don't need to log in
// GET all medical centres
medicalCentreRouter.get('/', errorHandler(async (req, res) => {
  const medicalCentres = await getMedicalCentres();
  res.status(200).json(medicalCentres);
}));

// GET one medical centre
medicalCentreRouter.get('/:medicalCentreId', errorHandler(async (req, res) => {
  const medicalCentre = await getMedicalCentre(req.params.medicalCentreId);
  res.status(200).json(medicalCentre);
}));

// Need to log in to create, update and delete
// CREATE medical centre
medicalCentreRouter.post('/', auth, validateMedicalCentreData, errorHandler(async (req, res) => {
  const newMedicalCentre = await createMedicalCentre(req.body);
  res.status(201).json(newMedicalCentre);
}));

// PATCH update medical centre
medicalCentreRouter.patch('/:medicalCentreId', auth, validateMedicalCentreData, errorHandler(async (req, res) => {
  const updatedMedicalCentre = await updateMedicalCentre(req.params.medicalCentreId, req.body);
  res.status(200).json(updatedMedicalCentre);
}));

// DELETE medical centre
medicalCentreRouter.delete('/:medicalCentreId', auth, errorHandler(async (req, res) => {
  const deletedMedicalCentre = await deleteMedicalCentre(req.params.medicalCentreId);
  res.status(200).json(deletedMedicalCentre);
}));

module.exports = medicalCentreRouter;
