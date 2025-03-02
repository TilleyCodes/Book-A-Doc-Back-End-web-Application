const DoctorAvailability = require('../models/doctorAvailability');

// GET ALL data from doctorAvailability db
async function getDoctorAvailabilities() {
  const doctorAvailabilities = await DoctorAvailability.find()
    .populate('doctorId', 'doctorName')
    .populate('availabilityId', 'date startTime endTime isBooked')
    .sort({ createdAt: -1 });
  return doctorAvailabilities;
}

// GET ONE data from doctorAvailability db
async function getDoctorAvailability(id) {
  const doctorAvailability = await DoctorAvailability.findById(id)
    .populate('doctorId', 'doctorName')
    .populate('availabilityId', 'date startTime endTime isBooked');

  if (!doctorAvailability) {
    const error = new Error(`Doctor availability with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return doctorAvailability;
}

// CREATE data from doctorAvailability db
async function createDoctorAvailability(data) {
  try {
    const newDoctorAvailability = await DoctorAvailability.create(data);
    return newDoctorAvailability;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
}

// UPDATE data from doctorAvailability db
async function updateDoctorAvailability(id, data) {
  const updatedDoctorAvailability = await DoctorAvailability.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true },
  );

  if (!updatedDoctorAvailability) {
    const error = new Error(`Doctor availability with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedDoctorAvailability;
}

// DELETE data from doctorAvailability db
async function deleteDoctorAvailability(id) {
  const deletedDoctorAvailability = await DoctorAvailability.findByIdAndDelete(id);
  if (!deletedDoctorAvailability) {
    const error = new Error(`Doctor availability with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedDoctorAvailability;
}

module.exports = {
  getDoctorAvailabilities,
  getDoctorAvailability,
  createDoctorAvailability,
  updateDoctorAvailability,
  deleteDoctorAvailability,
};
