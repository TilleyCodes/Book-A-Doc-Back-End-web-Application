const mongoose = require('mongoose');

// Schema with data properties
const bookingSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['completed', 'confirmed', 'cancelled'],
    default: 'confirmed',
    required: [true, 'Booking status is required']
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required'],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required'],
  },
  availabilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Availability',
    required: [true, 'Availability ID is required'],
  },
}, { timestamps: true });

// Model that uses schema
const Booking = mongoose.model('Booking', bookingSchema);

// Export model
module.exports = Booking;
