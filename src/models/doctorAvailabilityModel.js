const mongoose = require('mongoose')

// Schema with data properties
const doctorAvailabilitySchema = new mongoose.Schema({
    availabilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Availability',
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    }, 
}, {timestamps: true})

// Model that uses schema
const DoctorAvailability = mongoose.model('DoctorAvailability', doctorAvailabilitySchema)

// Export model
module.exports = { DoctorAvailability }