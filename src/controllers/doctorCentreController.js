const DoctorCentre = require('../models/doctorCentre');

// GET ALL doctor centres
async function getDoctorCentres() {
  const doctorCentre = await DoctorCentre.find()
    .populate('doctorId', 'doctorName')
    .populate('medicalCentreId', 'medicalCentreName');
  return doctorCentre;
}

// GET ONE doctor centre by ID
async function getDoctorCentre(id) {
  const doctorCentre = await DoctorCentre.findById(id)
    .populate('doctorId', 'doctorName')
    .populate('medicalCentreId', 'medicalCentreName');

  if (!doctorCentre) {
    const error = new Error(`Doctor centre with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return doctorCentre;
}

// CREATE doctor centre
async function createDoctorCentre(data) {
  try {
    const newDoctorCentre = await DoctorCentre.create(data);
    return newDoctorCentre;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE doctor centre
async function updateDoctorCentre(id, data) {
  const updatedDoctorCentre = await DoctorCentre.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true },
  );

  if (!updatedDoctorCentre) {
    const error = new Error(`Doctor centre with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedDoctorCentre;
}

// DELETE doctor centre
async function deleteDoctorCentre(id) {
  const deletedDoctorCentre = await DoctorCentre.findByIdAndDelete(id);

  if (!deletedDoctorCentre) {
    const error = new Error(`Doctor centre with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedDoctorCentre;
}

module.exports = {
  getDoctorCentres,
  getDoctorCentre,
  createDoctorCentre,
  updateDoctorCentre,
  deleteDoctorCentre,
};
