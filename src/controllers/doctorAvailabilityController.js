const doctorAvailability = require('../models/doctorAvailability');

// GET ALL data from doctorAvailability db
async function getDoctorAvailabilities() {
  const drAvailabilities = await doctorAvailability.find();
  return drAvailabilities;
}

// GET ONE data from doctorAvailability db
async function getDoctorAvailability(id) {
  const drAvailability = await doctorAvailability.findById(id);
  return drAvailability;
}

// CREATE data from doctorAvailability db
async function createDoctorAvailability(data) {
  const newDoctorAvailability = await doctorAvailability.create(data);
  return newDoctorAvailability;
}

// UPDATE data from doctorAvailability db
async function updateDoctorAvailability(id, data, options = {}) {
  const updatedDoctorAvailability = await doctorAvailability.findByIdAndUpdate(
    id,
    { $set: data }, // Allows partial update
    options,
  );
  return updatedDoctorAvailability;
}

// DELETE data from doctorAvailability db
async function deleteDoctorAvailability(id) {
  const deletedDoctorAvailability = await doctorAvailability.findByIdAndDelete(id);
  return deletedDoctorAvailability;
}

module.exports = {
  getDoctorAvailabilities,
  getDoctorAvailability,
  createDoctorAvailability,
  updateDoctorAvailability,
  deleteDoctorAvailability,
};
