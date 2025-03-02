const Specialty = require('../models/specialty');

// GET ALL specialties
async function getSpecialties() {
  const specialties = await Specialty.find().sort({ specialtyName: 1 });
  return specialties;
}

// GET ONE specialty by ID
async function getSpecialty(id) {
  const specialty = await Specialty.findById(id);
  if (!specialty) {
    const error = new Error(`Specialty with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return specialty;
}

// CREATE specialty
async function createSpecialty(data) {
  try {
    const newSpecialty = await Specialty.create(data);
    return newSpecialty;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE specialty
async function updateSpecialty(id, data = {}) {
  const updatedSpecialty = await Specialty.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true },
  );

  if (!updatedSpecialty) {
    const error = new Error(`Specialty with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedSpecialty;
}

// DELETE specialty
async function deleteSpecialty(id) {
  const deletedSpecialty = await Specialty.findByIdAndDelete(id);

  if (!deletedSpecialty) {
    const error = new Error(`Specialty with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedSpecialty;
}

module.exports = {
  getSpecialties,
  getSpecialty,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
