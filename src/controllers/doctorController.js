const Doctor = require('../models/doctor');

// GET ALL doctors
async function getDoctors() {
  const doctors = await Doctor.find();
  return doctors;
}

// GET ONE doctor
async function getDoctor(id) {
  const doctor = await Doctor.findById(id);
  return doctor;
}

// CREATE doctor
async function createDoctor(data) {
  const newDoctor = await Doctor.create(data);
  return newDoctor;
}

// UPDATE doctor
async function updateDoctor(id, data, options = {}) {
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    { $set: data },
    options,
  );
  return updatedDoctor;
}

// DELETE doctor
async function deleteDoctor(id) {
  const deletedDoctor = await Doctor.findByIdAndDelete(id);
  return deletedDoctor;
}

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
