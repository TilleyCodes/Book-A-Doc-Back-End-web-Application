const MedicalCentre = require('../models/medicalCentre');

// GET ALL medical centres
async function getMedicalCentres() {
  const medicalCentres = await MedicalCentre.find().sort({ medicalCentreName: 1 });
  return medicalCentres;
}

// GET ONE medical centre
async function getMedicalCentre(id) {
  const medicalCentre = await MedicalCentre.findById(id);
  if (!medicalCentre) {
    const error = new Error('Medical centre not found');
    error.status = 404;
    throw error;
  }
  return medicalCentre;
}

// CREATE medical centre
async function createMedicalCentre(data) {
  try {
    const newMedicalCentre = await MedicalCentre.create(data);
    return newMedicalCentre;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE medical centre
async function updateMedicalCentre(id, data) {
  const updatedMedicalCentre = await MedicalCentre.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );

  if (!updatedMedicalCentre) {
    const error = new Error('Medical centre not found');
    error.status = 404;
    throw error;
  }
  return updatedMedicalCentre;
}

// DELETE medical centre
async function deleteMedicalCentre(id) {
  const deletedMedicalCentre = await MedicalCentre.findByIdAndDelete(id);

  if (!deletedMedicalCentre) {
    const error = new Error('Medical centre not found');
    error.status = 404;
    throw error;
  }
  return deletedMedicalCentre;
}

module.exports = {
  getMedicalCentres,
  getMedicalCentre,
  createMedicalCentre,
  updateMedicalCentre,
  deleteMedicalCentre,
};
