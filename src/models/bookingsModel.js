const mongoose = require('mongoose')
const { PatientsModel } = require('./patientsModel')
const { AvailabilitiesModel } = require('./availabilitiesModel')

// Schema with data properties
const BookingsSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    doctor_id: { // to be updated once doctorsModel has been created
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true,
    }, 
    availability_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Availabilities',
        required: true,
    }, 
}, {timestamps: true})

// Model that uses schema
const BookingsModel = mongoose.model('Bookings', BookingsSchema)

// Export model
module.exports = {BookingsModel}