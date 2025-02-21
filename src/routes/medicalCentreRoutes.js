const express = require('express');
const {
  getMedicalCentres,
  getMedicalCentre,
  createMedicalCentre,
  updateMedicalCentre,
  deleteMedicalCentre,
} = require('../controllers/medicalCentreController');

const medicalCentreRouter = express.Router();

// GET all medical centres - http://localhost:3000/medicalCentres
medicalCentreRouter.get('/', async (req, res) => {
  const medicalCentres = await getMedicalCentres();
  res.json(medicalCentres);
});

// GET a single medical centre - http://localhost:3000/medicalCentres/_id
medicalCentreRouter.get('/:medicalCentreId', async (req, res) => {
  const medicalCentre = await getMedicalCentre(req.params.medicalCentreId);
  if (medicalCentre) {
    res.json(medicalCentre);
  } else {
    res.status(404).json({ error: `Medical centre with id ${req.params.medicalCentreId} not found` });
  }
});

// POST new medical centre - http://localhost:3000/medicalCentres
medicalCentreRouter.post('/', async (req, res) => {
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
});

// PATCH update medical centre - http://localhost:3000/medicalCentres/_id
medicalCentreRouter.patch('/:medicalCentreId', async (req, res) => {
  const bodyData = {
    medicalCentreName: req.body.medicalCentreName,
    operatingHours: req.body.operatingHours,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
    },
    contacts: {
      email: body.contacts.email,
      phone: body.contacts.phone,
    }
  };
  const updatedMedicalCentre = await updateMedicalCentre(req.params.medicalCentreId, bodyData);
  if (!updatedMedicalCentre) {
    res.status(404).json({ error: `Medical centre with id ${req.params.medicalCentreId} not found` });
  } else if (updatedMedicalCentre.error) {
    res.status(403).json(updatedMedicalCentre),
  } else {
    res.json(updatedMedicalCentre);
  }
});

// DELETE medical centre - http://localhost:3000/medicalCentres/_id
medicalCentreRouter.delete('/:medicalCentreId', async (req, res) => {
    const deletedMedicalCentre = await deleteMedicalCentre(req.params.medicalCentreId);
    if (deletedMedicalCentre) {
        res.json(deletedMedicalCentre);
    } else {
        res.status(404).json({ error: `Medical centre with id ${req.params.medicalCentreId} not found` });
    }
});

module.exports = medicalCentreRouter;