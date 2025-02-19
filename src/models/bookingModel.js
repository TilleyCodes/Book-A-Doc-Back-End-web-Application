const mongoose = require('mongoose')

// Schema with data properties
const bookingSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['completed', 'confirmed', 'cancelled'],
        default: 'confirmed',
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    }, 
    availabilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Availability',
    }, 
}, {timestamps: true})

// Model that uses schema
const Booking = mongoose.model('Booking', bookingSchema)

// Export model
module.exports = {Booking}