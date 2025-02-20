const express = require('express');

const availabilityRouter = express.Router();

const {
  getAvailabilities,
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require('../controllers/availabilityController');

// GET ALL | http://localhost:3000/availability
availabilityRouter.get(
  '/',
  async (req, res) => {
    try {
      const availabilities = await getAvailabilities();
      res.status(200).json(availabilities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// GET ONE | http://localhost:3000/availability/availablityId
availabilityRouter.get(
  '/:availablityId',
  async (req, res) => {
    const patient = await getAvailability(req.params.availablityId);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ error: `Availability with id: ${req.params.availablityId} does not exist` });
    }
  },
);

// CREATE | http://localhost:3000/availability
availabilityRouter.post(
  '/',
  async (req, res) => {
    try {
      const newAvailability = await createAvailability(req.body);
      res.status(201).json(newAvailability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// UPDATE | http://localhost:3000/availability/patient_id
availabilityRouter.patch(
  '/:availablityId',
  async (req, res) => {
    try {
      const { availablityId } = req.params;
      const updatedAvailability = await updateAvailability(availablityId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedAvailability) {
        res.status(404).json({ error: `Availability with id: ${req.params.availablityId} does not exist` });
      }
      res.status(200).json(updatedAvailability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// DELETE | http://localhost:3000/availability/patient_id
availabilityRouter.delete(
  '/:availablityId',
  async (req, res) => {
    try {
      const deletedAvailability = await deleteAvailability(req.params.availablityId);

      if (!deletedAvailability) {
        res.status(404).json({ error: `Availability with id: ${req.params.availablityId} does not exist` });
      }
      res.status(200).json(deletedAvailability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

module.exports = availabilityRouter;
