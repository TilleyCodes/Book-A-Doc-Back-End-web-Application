const express = require('express');
const {
  getMedicalCentres,
  getMedicalCentre,
  createMedicalCentre,
  updateMedicalCentre,
  deleteMedicalCentre,
} = require('../controllers/medicalCentreController');

const errorHandler = require('../middleware/errorHandler');

const medicalCentreRouter = express.Router();

// GET all medical centres - http://localhost:3000/medicalCentres
medicalCentreRouter.get('/', errorHandler(async (req, res) => {
  const medicalCentres = await getMedicalCentres();
  res.status(200).json(medicalCentres);
}));

// GET a single medical centre - http://localhost:3000/medicalCentres/_id
medicalCentreRouter.get('/:medicalCentreId', errorHandler(async (req, res) => {
  const medicalCentre = await getMedicalCentre(req.params.medicalCentreId);
  if (!medicalCentre) {
    res.status(404).json({ error: `Medical centre with id ${req.params.medicalCentreId} not found` });
  }
  res.status(200).json(medicalCentre);
}));

// CREATE new medical centre - http://localhost:3000/medicalCentres
medicalCentreRouter.post('/', errorHandler(async (req, res) => {
  const bodyData = {
    medicalCentreName: req.body.medicalCentreName,
    operatingHours: req.body.operatingHours,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
    },
    contacts: {
      email: req.body.contacts.email,
      phone: req.body.contacts.phone,
    },
  };
  const newMedicalCentre = await createMedicalCentre(bodyData);
  res.status(201).json(newMedicalCentre);
}));

// PATCH update medical centre - http://localhost:3000/medicalCentres/_id
medicalCentreRouter.patch('/:medicalCentreId', errorHandler(async (req, res) => {
  const bodyData = {
    medicalCentreName: req.body.medicalCentreName,
    operatingHours: req.body.operatingHours,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
    },
    contacts: {
      email: req.body.contacts.email,
      phone: req.body.contacts.phone,
    },
  };
  const updatedMedicalCentre = await updateMedicalCentre(req.params.medicalCentreId, bodyData);
  if (!updatedMedicalCentre) {
    res.status(404).json({ error: `Medical centre with id ${req.params.medicalCentreId} not found` });
  } else if (updatedMedicalCentre.error) {
    res.status(403).json(updatedMedicalCentre);
  } else {
    res.status(200).json(updatedMedicalCentre);
  }
}));

// DELETE medical centre - http://localhost:3000/medicalCentres/_id
medicalCentreRouter.delete('/:medicalCentreId', errorHandler(async (req, res) => {
  const deletedMedicalCentre = await deleteMedicalCentre(req.params.medicalCentreId);
  if (!deletedMedicalCentre) {
    res.status(404).json({ error: `Medical centre with id ${req.params.medicalCentreId} not found` });
  }
  res.status(200).json(deletedMedicalCentre);
}));

module.exports = medicalCentreRouter;
