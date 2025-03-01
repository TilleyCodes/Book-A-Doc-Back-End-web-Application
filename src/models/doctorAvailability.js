const mongoose = require('mongoose');

// Schema with data properties
const doctorAvailabilitySchema = new mongoose.Schema({
  availabilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Availability',
    required: [true, 'Availability ID is required'],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required'],
  },
}, { timestamps: true });

// Model that uses schema
const DoctorAvailability = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);

// Export model
module.exports = DoctorAvailability;
