const Specialty = require('../models/specialty');

// GET ALL specialties
const getSpecialties = async () => {
  try {
    return await Specialty.find();
  } catch (error) {
    console.error('Error getting specialties:', error.message);
    throw error;
  }
};

// GET ONE specialty
const getSpecialty = async (id) => {
  try {
    return await Specialty.findById(id);
  } catch (error) {
    console.error('Error getting specialty:', error.message);
    throw error;
  }
};

// CREATE specialty
const createSpecialty = async (data) => {
  try {
    return await Specialty.create(data);
  } catch (error) {
    console.error('Error creating specialty:', error.message);
    throw error;
  }
};

// UPDATE specialty
const updateSpecialty = async (id, data, options = { new: true }) => {
  try {
    return await Specialty.findByIdAndUpdate(
      id,
      { $set: data },
      options,
    );
  } catch (error) {
    console.error('Error updating specialty:', error.message);
    throw error;
  }
};

// DELETE specialty
const deleteSpecialty = async (id) => {
  try {
    return await Specialty.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting specialty:', error.message);
    throw error;
  }
};

module.exports = {
  getSpecialties,
  getSpecialty,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
