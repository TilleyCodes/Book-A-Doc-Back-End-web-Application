const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  specialtyName: {
    type: String,
    required: [true, 'Specialty name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
});

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
