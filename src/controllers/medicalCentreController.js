const MedicalCentre = require('../models/medicalCentre');

// GET ALL medical centres
async function getMedicalCentres() {
  const medicateCentre = await MedicalCentre.find();
  return medicateCentre;
}

// GET ONE medical centre
async function getMedicalCentre(id) {
  const medicalCentre = await MedicalCentre.findById(id);
  return medicalCentre;
}

// CREATE medical centre
async function createMedicalCentre(data) {
  const newMedicalCentre = await MedicalCentre.create(data);
  return newMedicalCentre;
}

// UPDATE medical centre
async function updateMedicalCentre(id, data, options = {}) {
  const updatedMedicalCentre = await MedicalCentre.findByIdAndUpdate(
    id,
    { $set: data },
    options,
  );
  return updatedMedicalCentre;
}

// DELETE medical centre
async function deleteMedicalCentre(id) {
  const deletedMedicalCentre = await MedicalCentre.findByIdAndDelete(id);
  return deletedMedicalCentre;
}

module.exports = {
  getMedicalCentres,
  getMedicalCentre,
  createMedicalCentre,
  updateMedicalCentre,
  deleteMedicalCentre,
};
