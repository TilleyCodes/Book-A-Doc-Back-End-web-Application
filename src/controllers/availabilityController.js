const Availability = require('../models/availability');

// GET ALL data from AvailabilityModel db
async function getAvailabilities() {
  const availabilities = await Availability.find();
  return availabilities;
}

// GET ONE data from AvailabilityModel db
async function getAvailability(id) {
  const patient = await Availability.findById(id);
  return patient;
}

// CREATE data from AvailabilityModel db
async function createAvailability(data) {
  const newAvailability = await Availability.create(data);
  return newAvailability;
}

// UPDATE data from AvailabilityModel db
async function updateAvailability(id, data, options = {}) {
  const updatedAvailability = await Availability.findByIdAndUpdate(
    id,
    { $set: data }, // Allows partial update
    options,
  );
  return updatedAvailability;
}

// DELETE data from AvailabilityModel db
async function deleteAvailability(id) {
  const deletedAvailability = await Availability.findByIdAndDelete(id);
  return deletedAvailability;
}

module.exports = {
  getAvailabilities,
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
};
