const Doctor = require('../models/doctor');

// GET ALL doctors
async function getDoctors() {
  const doctors = await Doctor.find().sort({ doctorName: 1 }).populate('specialtyId', 'specialtyName');
  return doctors;
}

// GET ONE doctor by ID
async function getDoctor(id) {
  const doctor = await Doctor.findById(id).populate('specialtyId', 'specialtyName');
  if (!doctor) {
    const error = new Error(`Doctor with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return doctor;
}

// CREATE doctor
async function createDoctor(data) {
  try {
    const newDoctor = await Doctor.create(data);
    return newDoctor;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE doctor
async function updateDoctor(id, data) {
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true },
  );

  if (!updatedDoctor) {
    const error = new Error(`Doctor with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedDoctor;
}

// DELETE doctor
async function deleteDoctor(id) {
  const deletedDoctor = await Doctor.findByIdAndDelete(id);

  if (!deletedDoctor) {
    const error = new Error(`Doctor with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedDoctor;
}

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
