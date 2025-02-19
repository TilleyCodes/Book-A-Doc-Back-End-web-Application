const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    doctor_name: {
        type: String,
        required: [true, 'Doctor name is required']
    },
    specialty_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'specialty'
    }
});

// Add index for faster queries
doctorSchema.index({ 'doctor_name': 1 });

const DoctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = { DoctorModel };