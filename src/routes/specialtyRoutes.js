const express = require('express');
const {
  getSpecialties,
  getSpecialty,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} = require('../controllers/specialtyController');

const specialtyRouter = express.Router();

// GET all specialties - http://localhost:3000/specialties
specialtyRouter.get('/', async (req, res) => {
  try {
    const specialties = await getSpecialties();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single specialty - http://localhost:3000/specialties/_id
specialtyRouter.get('/:specialtyId', async (req, res) => {
  const specialty = await getSpecialty(req.params.specialtyId);
  if (specialty) {
    res.status(200).json(specialty);
  } else {
    res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
  }
});

// CREATE new specialty - http://localhost:3000/specialties
specialtyRouter.post('/', async (req, res) => {
  try {
    const bodyData = {
      specialtyName: req.body.specialtyName,
      description: req.body.description,
    };
    const newSpecialty = await createSpecialty(bodyData);
    res.status(201).json(newSpecialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH update specialty - http://localhost:3000/specialties/_id
specialtyRouter.patch('/:specialtyId', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE specialty - http://localhost:3000/specialties/_id
specialtyRouter.delete('/:specialtyId', async (req, res) => {
  try {
    const deletedSpecialty = await deleteSpecialty(req.params.specialtyId);
    if (deletedSpecialty) {
      res.status(200).json(deletedSpecialty);
    } else {
      res.status(404).json({ error: `Specialty with id ${req.params.specialtyId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = specialtyRouter;
