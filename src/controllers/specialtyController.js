const Specialty = require('../models/specialty');

// GET ALL specialties
async function getSpecialties() {
  const specialty = await Specialty.find();
  return specialty;
}

// GET ONE specialty
async function getSpecialty(id) {
  const specialty = await Specialty.findById(id);
  return specialty;
}

// CREATE specialty
async function createSpecialty(data) {
  const newSpecialty = await Specialty.create(data);
  return newSpecialty;
}

// UPDATE specialty
async function updateSpecialty(id, data, options = {}) {
  const updatedSpecialty = await Specialty.findByIdAndUpdate(
    id,
    { $set: data },
    options,
  );
  return updatedSpecialty;
}

// DELETE specialty
async function deleteSpecialty(id) {
  const deletedSpecialty = await Specialty.findByIdAndDelete(id);
  return deletedSpecialty;
}

module.exports = {
  getSpecialties,
  getSpecialty,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
