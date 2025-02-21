const express = require('express');

const doctorAvailabilityRouter = express.Router();

const {
  getDoctorAvailabilities,
  getDoctorAvailability,
  createDoctorAvailability,
  updateDoctorAvailability,
  deleteDoctorAvailability,
} = require('../controllers/doctorAvailabilityController');

// GET ALL | http://localhost:3000/doctor_availability
doctorAvailabilityRouter.get(
  '/',
  async (req, res) => {
    try {
      const drAvailabilities = await getDoctorAvailabilities();
      res.status(200).json(drAvailabilities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// GET ONE | http://localhost:3000/doctor_availability/drAvailId
doctorAvailabilityRouter.get(
  '/:drAvailId',
  async (req, res) => {
    const drAvailability = await getDoctorAvailability(req.params.drAvailId);
    if (drAvailability) {
      res.status(200).json(drAvailability);
    } else {
      res.status(404).json({ error: `Doctor availability with id: ${req.params.drAvailId} does not exist` });
    }
  },
);

// CREATE | http://localhost:3000/doctor_availability
doctorAvailabilityRouter.post(
  '/',
  async (req, res) => {
    try {
      const newDoctorAvailability = await createDoctorAvailability(req.body);
      res.status(201).json(newDoctorAvailability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// UPDATE | http://localhost:3000/doctor_availability/drAvailId
doctorAvailabilityRouter.patch(
  '/:drAvailId',
  async (req, res) => {
    try {
      const { drAvailId } = req.params;
      const updatedDoctorAvailability = await updateDoctorAvailability(drAvailId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedDoctorAvailability) {
        res.status(404).json({ error: `Doctor availability with id: ${req.params.drAvailId} does not exist` });
      }
      res.status(200).json(updatedDoctorAvailability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// DELETE | http://localhost:3000/doctor_availability/drAvailId
doctorAvailabilityRouter.delete(
  '/:drAvailId',
  async (req, res) => {
    try {
      const deletedDoctorAvailability = await deleteDoctorAvailability(req.params.drAvailId);

      if (!deletedDoctorAvailability) {
        res.status(404).json({ error: `Doctor availability with id: ${req.params.drAvailId} does not exist` });
      }
      res.status(200).json(deletedDoctorAvailability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

module.exports = doctorAvailabilityRouter;
