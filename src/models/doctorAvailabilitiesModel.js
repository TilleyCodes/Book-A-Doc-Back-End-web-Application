const mongoose = require('mongoose')
const { AvailabilitiesModel } = require('./availabilitiesModel')

// Schema with data properties
const DoctorAvailabilitiesSchema = new mongoose.Schema({
    availability_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Availabilities',
    },
    doctor_id: { // to be updated once doctorsModel has been created
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
    }, 
}, {timestamps: true})

// Model that uses schema
const DoctorAvailabilitiesModel = mongoose.model('DoctorAvailabilities', DoctorAvailabilitiesSchema)

// Export model
module.exports = {DoctorAvailabilitiesModel}