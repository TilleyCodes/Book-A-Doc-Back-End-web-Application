const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true,
  },
  specialtyId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Specialty',
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
