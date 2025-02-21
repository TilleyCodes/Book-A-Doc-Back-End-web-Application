const express = require('express');
const {
  getDoctorCentres,
  getDoctorCentre,
  createDoctorCentre,
  updateDoctorCentre,
  deleteDoctorCentre,
} = require('../controllers/doctorCentreController');

const doctorCentreRouter = express.Router();

// GET all doctor centres - http://localhost:3000/doctorCentres
doctorCentreRouter.get('/', async (req, res) => {
  try {
    const doctorCentres = await getDoctorCentres();
    res.status(200).json(doctorCentres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.get('/:doctorCentreId', async (req, res) => {
  const doctorCentre = await getDoctorCentre(req.params.doctorCentreId);
  if (doctorCentre) {
    res.status(200).json(doctorCentre);
  } else {
    res.status(404).json({ error: `Doctor centre with id ${req.params.doctorCentreId} not found` });
  }
});

// CREATE new doctor centre - http://localhost:3000/doctorCentres
doctorCentreRouter.post('/', async (req, res) => {
  try {
    const bodyData = {
      doctorId: req.body.doctorId,
      medicalCentreId: req.body.medicalCentreId,
    };
    const newDoctorCentre = await createDoctorCentre(bodyData);
    res.status(201).json(newDoctorCentre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH update doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.patch('/:doctorCentreId', async (req, res) => {
  try {
    const bodyData = {
      doctorId: req.body.doctorId,
      medicalCentreId: req.body.medicalCentreId,
    };
    const updatedDoctorCentre = await updateDoctorCentre(req.params.doctorCentreId, bodyData);
    if (!updatedDoctorCentre) {
      res.status(404).json({ error: `Doctor centre with id ${req.params.doctorCentreId} not found` });
    } else if (updatedDoctorCentre.error) {
      res.status(403).json(updatedDoctorCentre);
    } else {
      res.status(200).json(updatedDoctorCentre);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.delete('/:doctorCentreId', async (req, res) => {
  try {
    const deletedDoctorCentre = await deleteDoctorCentre(req.params.doctorCentreId);
    if (deletedDoctorCentre) {
      res.status(200).json(deletedDoctorCentre);
    } else {
      res.status(404).json({ error: `Doctor centre with id ${req.params.doctorCentreId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = doctorCentreRouter;
