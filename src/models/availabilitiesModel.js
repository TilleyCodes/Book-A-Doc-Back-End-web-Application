const mongoose = require('mongoose')

// Schema with data properties
const AvailabilitiesSchema = new mongoose.Schema({
    date: Date,
    start_time: String,
    end_time: String,
    is_booked: Boolean,
})

// Model that uses schema
const AvailabilitiesModel = mongoose.model('Availabilities', AvailabilitiesSchema)

// Export model
module.exports = {AvailabilitiesModel}