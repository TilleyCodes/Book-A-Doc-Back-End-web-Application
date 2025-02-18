const mongoose = require('mongoose')

const specialtySchema = new mongoose.Schema({
    specialty_name: {
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
specialtySchema.index({ 'specialty_name': 1 });

const SpecialtyModel = mongoose.model('Specialty', specialtySchema);

module.exports = { SpecialtyModel };