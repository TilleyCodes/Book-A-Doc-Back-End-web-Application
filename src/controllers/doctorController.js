const Doctor = require('../models/doctor');

// GET ALL doctors
const getDoctors = async () => {
  try {
    return await Doctor.find();
  } catch (error) {
    console.error('Error getting doctors:', error.message);
    throw error;
  }
};

// GET ONE doctor
const getDoctor = async (id) => {
  try {
    return await Doctor.findById(id);
  } catch (error) {
    console.error('Error getting doctor:', error.message);
    throw error;
  }
};

// CREATE doctor
const createDoctor = async (data) => {
  try {
    return await Doctor.create(data);
  } catch (error) {
    console.error('Error creating doctor:', error.message);
    throw error;
  }
};

// UPDATE doctor
const updateDoctor = async (id, data, options = { new: true }) => {
  try {
    return await Doctor.findByIdAndUpdate(
      id,
      { $set: data },
      options,
    );
  } catch (error) {
    console.error('Error updating doctor:', error.message);
    throw error;
  }
};

// DELETE doctor
const deleteDoctor = async (id) => {
  try {
    return await Doctor.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting doctor:', error.message);
    throw error;
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
