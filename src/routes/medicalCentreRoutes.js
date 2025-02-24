const express = require('express');
const medicalCentreRouter = express.Router();
const MedicalCentre = require('../models/medicalCentre');
const auth = require('../middleware/authMiddleware');

// Validation middleware
const validateMedicalCentreData = (req, res, next) => {
  const { medicalCentreName, operatingHours, address, contacts } = req.body;
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
    return res.status(400).json({ errors });
  }
  next();
};

// Don't need to log in
// GET all medical centres
medicalCentreRouter.get('/', async (req, res) => {
  try {
    const medicalCentres = await MedicalCentre.find().sort({ medicalCentreName: 1 });
    res.status(200).json(medicalCentres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET one medical centre
medicalCentreRouter.get('/:medicalCentreId', async (req, res) => {
  try {
    const medicalCentre = await MedicalCentre.findById(req.params.medicalCentreId);
    if (!medicalCentre) {
      return res.status(404).json({ error: 'Medical centre not found' });
    }
    res.status(200).json(medicalCentre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Need to log in to create, update and delete
// CREATE medical centre
medicalCentreRouter.post('/', auth, validateMedicalCentreData, async (req, res) => {
  try {
    const newMedicalCentre = await MedicalCentre.create(req.body);
    res.status(201).json(newMedicalCentre);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// UPDATE medical centre
medicalCentreRouter.patch('/:medicalCentreId', auth, validateMedicalCentreData, async (req, res) => {
  try {
    const updatedMedicalCentre = await MedicalCentre.findByIdAndUpdate(
      req.params.medicalCentreId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMedicalCentre) {
      return res.status(404).json({ error: 'Medical centre not found' });
    }

    res.status(200).json(updatedMedicalCentre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE medical centre
medicalCentreRouter.delete('/:medicalCentreId', auth, async (req, res) => {
  try {
    const deletedMedicalCentre = await MedicalCentre.findByIdAndDelete(req.params.medicalCentreId);
    
    if (!deletedMedicalCentre) {
      return res.status(404).json({ error: 'Medical centre not found' });
    }

    res.status(200).json(deletedMedicalCentre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = medicalCentreRouter;