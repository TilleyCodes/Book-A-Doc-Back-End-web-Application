const mongoose = require('mongoose')

const specialtySchema = new mongoose.Schema({
    specialtyName: {
        type: String,
        required: [true, 'Specialty name is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
});

// Add index for faster queries
specialtySchema.index({ 'specialtyName': 1 });

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = { Specialty };