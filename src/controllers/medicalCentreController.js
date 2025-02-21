const MedicalCentre = require('../models/medicalCentre');

// GET ALL medical centres
const getMedicalCentres = async () => {
  try {
    return await MedicalCentre.find();
  } catch (error) {
    console.error('Error getting medical centres:', error.message);
    throw error;
  }
};

// GET ONE medical centre
const getMedicalCentre = async (id) => {
  try {
    return await MedicalCentre.findById(id);
  } catch (error) {
    console.error('Error getting medical centre:', error.message);
    throw error;
  }
};

// CREATE medical centre
const createMedicalCentre = async (data) => {
  try {
    return await MedicalCentre.create(data);
  } catch (error) {
    console.error('Error creating medical centre:', error.message);
    throw error;
  }
};

// UPDATE medical centre
const updateMedicalCentre = async (id, data, options = { new: true }) => {
  try {
    return await MedicalCentre.findByIdAndUpdate(
      id,
      { $set: data },
      options,
    );
  } catch (error) {
    console.error('Error updating medical centre:', error.message);
    throw error;
  }
};

// DELETE medical centre
const deleteMedicalCentre = async (id) => {
  try {
    return await MedicalCentre.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting medical centre:', error.message);
    throw error;
  }
};

module.exports = {
  getMedicalCentres,
  getMedicalCentre,
  createMedicalCentre,
  updateMedicalCentre,
  deleteMedicalCentre,
};
