const express = require('express');
const {
  getDoctorCentres,
  getDoctorCentre,
  createDoctorCentre,
  updateDoctorCentre,
  deleteDoctorCentre,
} = require('../controllers/doctorCentreController');

const errorHandler = require('../middleware/errorHandler');

const doctorCentreRouter = express.Router();

// GET all doctor centres - http://localhost:3000/doctorCentres
doctorCentreRouter.get('/', errorHandler(async (req, res) => {
  const doctorCentres = await getDoctorCentres();
  res.status(200).json(doctorCentres);
}));

// GET a single doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.get('/:doctorCentreId', errorHandler(async (req, res) => {
  const doctorCentre = await getDoctorCentre(req.params.doctorCentreId);
  if (!doctorCentre) {
    res.status(404).json({ error: `Doctor centre with id ${req.params.doctorCentreId} not found` });
  }
  res.status(200).json(doctorCentre);
}));

// CREATE new doctor centre - http://localhost:3000/doctorCentres
doctorCentreRouter.post('/', errorHandler(async (req, res) => {
  const bodyData = {
    doctorId: req.body.doctorId,
    medicalCentreId: req.body.medicalCentreId,
  };
  const newDoctorCentre = await createDoctorCentre(bodyData);
  res.status(201).json(newDoctorCentre);
}));

// PATCH update doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.patch('/:doctorCentreId', errorHandler(async (req, res) => {
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
}));

// DELETE doctor centre - http://localhost:3000/doctorCentres/_id
doctorCentreRouter.delete('/:doctorCentreId', errorHandler(async (req, res) => {
  const deletedDoctorCentre = await deleteDoctorCentre(req.params.doctorCentreId);
  if (!deletedDoctorCentre) {
    res.status(404).json({ error: `Doctor centre with id ${req.params.doctorCentreId} not found` });
  }
  res.status(200).json(deletedDoctorCentre);
}));

module.exports = doctorCentreRouter;
