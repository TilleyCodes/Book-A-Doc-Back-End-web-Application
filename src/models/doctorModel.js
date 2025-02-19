const mongoose = require('mongoose')
const { specialtyModel } = require('./specialtyModel')

const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: [true, 'Doctor name is required']
    },
    specialtyId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Specialty'
    }
});

// Add index for faster queries
doctorSchema.index({ 'doctorName': 1 });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Doctor };