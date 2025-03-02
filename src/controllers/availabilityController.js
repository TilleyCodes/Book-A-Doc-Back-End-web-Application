const Availability = require('../models/availability');

// GET ALL data from AvailabilityModel db
async function getAvailabilities() {
  const availabilities = await Availability.find().sort({ date: 1, startTime: 1 });
  return availabilities;
}

// GET ONE data from AvailabilityModel db
async function getAvailability(id) {
  const availability = await Availability.findById(id);
  if (!availability) {
    const error = new Error(`Availability with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return availability;
}

// CREATE data from AvailabilityModel db
async function createAvailability(data) {
  try {
    const newAvailability = await Availability.create(data);
    return newAvailability;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE data from AvailabilityModel db
async function updateAvailability(id, data) {
  const updatedAvailability = await Availability.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true },
  );

  if (!updatedAvailability) {
    const error = new Error(`Availability with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedAvailability;
}

// DELETE data from AvailabilityModel db
async function deleteAvailability(id) {
  const deletedAvailability = await Availability.findByIdAndDelete(id);
  if (!deletedAvailability) {
    const error = new Error(`Availability with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedAvailability;
}

module.exports = {
  getAvailabilities,
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
};
