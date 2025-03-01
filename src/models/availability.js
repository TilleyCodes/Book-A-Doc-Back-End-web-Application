const mongoose = require('mongoose');

// Schema with data properties
const availabilitySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    trim: true,
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    trim: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

// Model that uses schema
const Availability = mongoose.model('Availability', availabilitySchema);

// Export model
module.exports = Availability;
