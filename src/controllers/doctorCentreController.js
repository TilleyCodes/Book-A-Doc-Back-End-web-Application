const DoctorCentre = require('../models/doctorCentre');

// GET ALL doctor centres
async function getDoctorCentres() {
  const doctorCentre = await DoctorCentre.find();
  return doctorCentre;
}

// GET ONE doctor centre
async function getDoctorCentre(id) {
  const doctorCentre = await DoctorCentre.findById(id);
  return doctorCentre;
}

// CREATE doctor centre
async function createDoctorCentre(data) {
  const newDoctorCentre = await DoctorCentre.create(data);
  return newDoctorCentre;
}

// UPDATE doctor centre
async function updateDoctorCentre(id, data, options = {}) {
  const updatedDoctorCentre = await DoctorCentre.findByIdAndUpdate(
    id,
    { $set: data },
    options,
  );
  return updatedDoctorCentre;
}

// DELETE doctor centre
async function deleteDoctorCentre(id) {
  const deletedDoctorCentre = await DoctorCentre.findByIdAndDelete(id);
  return deletedDoctorCentre;
}

module.exports = {
  getDoctorCentres,
  getDoctorCentre,
  createDoctorCentre,
  updateDoctorCentre,
  deleteDoctorCentre,
};
