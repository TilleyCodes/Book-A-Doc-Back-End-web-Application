const express = require('express');
const {
  getSpecialties,
  getSpecialty,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} = require('../controllers/specialtyController');

const errorHandler = require('../middleware/errorHandler');

const specialtyRouter = express.Router();

// GET all specialties - http://localhost:3000/specialties
specialtyRouter.get('/', errorHandler(async (req, res) => {
  const specialties = await getSpecialties();
  res.status(200).json(specialties);
}));

// GET a single specialty - http://localhost:3000/specialties/_id
specialtyRouter.get('/:specialtyId', errorHandler(async (req, res) => {
  const specialty = await getSpecialty(req.params.specialtyId);
  if (!specialty) {
    res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
  }
  res.status(200).json(specialty);
}));

// CREATE new specialty - http://localhost:3000/specialties
specialtyRouter.post('/', errorHandler(async (req, res) => {
  const bodyData = {
    specialtyName: req.body.specialtyName,
    description: req.body.description,
  };
  const newSpecialty = await createSpecialty(bodyData);
  res.status(201).json(newSpecialty);
}));

// PATCH update specialty - http://localhost:3000/specialties/_id
specialtyRouter.patch('/:specialtyId', async (req, res) => {
  const bodyData = {
    specialtyName: req.body.specialtyName,
    description: req.body.description,
  };
  const updatedSpecialty = await updateSpecialty(req.params.specialtyId, bodyData);
  if (!updatedSpecialty) {
    res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
  } else if (updatedSpecialty.error) {
    res.status(403).json(updatedSpecialty);
  } else {
    res.status(200).json(updatedSpecialty);
  }
});

// DELETE specialty - http://localhost:3000/specialties/_id
specialtyRouter.delete('/:specialtyId', async (req, res) => {
  const deletedSpecialty = await deleteSpecialty(req.params.specialtyId);
  if (!deletedSpecialty) {
    res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
  }
  res.status(200).json(deletedSpecialty);
});

module.exports = specialtyRouter;
